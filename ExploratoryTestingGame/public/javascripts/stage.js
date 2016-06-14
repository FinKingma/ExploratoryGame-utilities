var margin = 20;
var scorecardWidth = .3;
var gameWidth = .7;
var play;

var timebox = 30;

//var goal = new Goal();
var seconds = 3;
var tempStage = Stage();
tempStage.context.font="20px Georgia";
tempStage.context.fillText("GET READY!",window.innerWidth / 2,(window.innerHeight / 2)-100);
tempStage.context.fillText("3",window.innerWidth / 2,window.innerHeight / 2);
var totalDiscoverables;
var currentDiscoverables;

var tensionTimer = setInterval(function() {
    seconds--;
    tempStage.context.rect(0,0,window.innerWidth,window.innerHeight);
    tempStage.context.fillStyle = 'rgba(255, 255, 255, 1)';
    tempStage.context.fill();
    tempStage.context.fillStyle = 'rgba(0, 0, 0, 1)';
    tempStage.context.fillText("GET READY!",window.innerWidth / 2,(window.innerHeight / 2)-100);
    tempStage.context.fillText(seconds,window.innerWidth / 2,window.innerHeight / 2);

    if (seconds === 0) {
        clearInterval(tensionTimer);
        startGame();
    }
},1000);

function startGame() {
    console.log('generating a new map');
    new Map(function(map) {
        console.log('retrieving goal');
        Map.getGoal(function(goalPos) {
            new Goal(goalPos);
            var controls = $("#controls").val();
            console.log('playing with a ' + controls + '.');
            new Hero(controls, gameWidth);
            new Discoverables();
            new Scorecard(scorecardWidth, timebox);
            console.log('preparing the stage...');
            getInitialMapData(function() {
                play = setInterval(function() {
                    renderStage();
                },25);
                timer = setInterval(function() {
                    if (Scorecard.timeboxTick()) {
                        endSession(false);
                        clearInterval(timer);
                    }
                },1000);
            });
        });
    });
}
function getInitialMapData(callback) {
    var stage = Stage();
    drawBackground(stage);
    Map.draw(stage.context,stage.sw,stage.sh,stage.margin);

    var startingCanvasData = stage.context.getImageData(0, 0, stage.sw, stage.sh).data;

    totalDiscoverables = 0;
    for (var i=0;i<(startingCanvasData.length/4);i++) {
        if (startingCanvasData[(i*4)] !== 150 && startingCanvasData[(i*4)+1] !== 200 && startingCanvasData[(i*4)+2] !== 200) {
            totalDiscoverables++;
        }
    }
    console.log('total: ' + totalDiscoverables);

    //clear background
    stage.context.rect(0,0,stage.sw,stage.sh);
    stage.context.fillStyle = 'rgba(150, 200, 200, 1)';
    stage.context.fill();

    callback();
}

function Stage() {
    var stage = {
        canvas : document.getElementById("gamestage"),
        context : document.getElementById("gamestage").getContext("2d"),
        margin : margin,
        sw : window.innerWidth * gameWidth,
        sh : window.innerHeight
    };
    stage.canvas.width = stage.sw;
    stage.canvas.height = stage.sh;

    return stage;
}

function renderStage() {
    var stage = Stage();
    checkForPickups();
    drawStage(stage);
}

function checkForPickups() {
    var lineLengthHor = (Map.sw/(Map.lines-1));
    var lineLengthVer = (Map.sh/(Map.lines-1));

    for (var keyY in Map.grid) {
        if (Map.grid.hasOwnProperty(keyY)) {
            for (var keyX in Map.grid[keyY]) {
                if (Map.grid[keyY].hasOwnProperty(keyX)) {
                    for (var property in Map.grid[keyY][keyX]) {
                        if (Map.grid[keyY][keyX].hasOwnProperty(property)) {
                            if (Map.grid[keyY][keyX][property] === 'Feature' ||
                                Map.grid[keyY][keyX][property] === 'Broken') {
                                var posY = keyY.split('posY')[1];
                                var posX = keyX.split('posX')[1];

                                var lineX = (posX * (Map.sw / (Map.lines-1)))+Map.margin;
                                var lineY = (posY * (Map.sh / (Map.lines-1)))+Map.margin;

                                var dist;

                                switch(property) {
                                    case "pathRight":
                                        var distX1 = Math.abs((Hero.x*Hero.percentageX) - lineX);
                                        var distX2 = Math.abs((Hero.x*Hero.percentageX) - (lineX+lineLengthHor));
                                        var distX = distX1 < distX2 ? distX1 : distX2;
                                        var distY = Math.abs((Hero.y*Hero.percentageY) - lineY);
                                        dist = Math.sqrt(Math.pow(distX,2) + Math.pow(distY,2));

                                        break;
                                    case "pathDown" :
                                        var distX = Math.abs((Hero.x*Hero.percentageX) - lineX);
                                        var distY1 = Math.abs((Hero.y*Hero.percentageY) - lineY);
                                        var distY2 = Math.abs((Hero.y*Hero.percentageY) - (lineY+lineLengthVer));
                                        var distY = distY1 < distY2 ? distY1 : distY2;
                                        dist = Math.sqrt(Math.pow(distX,2) + Math.pow(distY,2));
                                        break;
                                }
                                if (dist <= Hero.size) {
                                    if (Map.grid[keyY][keyX][property] === 'Feature') {
                                        Map.grid[keyY][keyX][property] = 'FeatureFound';
                                        Discoverables.discoverFeature();
                                    }
                                    if (Map.grid[keyY][keyX][property] === 'Broken') {
                                        Map.grid[keyY][keyX][property] = 'BugFound';
                                        Discoverables.discoverBug();
                                    }
                                }
                            }
                        }
                    }

                }
            }
        }
    }
    var distX = Math.abs((Hero.x*Hero.percentageX) - (((Goal.sw/12)*Goal.x)+Goal.margin));
    var distY = Math.abs((Hero.y*Hero.percentageY) - (((Goal.sh/12)*Goal.y)+Goal.margin));
    dist = Math.sqrt(Math.pow(distX,2) + Math.pow(distY,2));
    if (dist <= (Goal.size + (Hero.size/2))) {
        endSession(true);
    }
}

function drawStage(stage) {
    Scorecard.draw(scorecardWidth);

    //draw greyed-out version of map
    drawBackground(stage);
    stage.context.save();
    stage.context.beginPath();
    var visited = Hero.getVisitedPos();
    for (var i = 0;i<visited.x.length; i++) {
        stage.context.arc(visited.x[i], visited.y[i], 60, 0, 2 * Math.PI, false);
    }
    stage.context.closePath();
    stage.context.clip();
    Map.draw(stage.context,stage.sw,stage.sh,stage.margin);

    stage.context.restore();
    canvasData = stage.context.getImageData(0, 0, stage.sw, stage.sh).data;

    currentDiscoverables = 0;
    for (var j=0;j<(canvasData.length/4);j++) {
        if (canvasData[(j*4)] !== 150 && canvasData[(j*4)+1] !== 200 && canvasData[(j*4)+2] !== 200) {
            currentDiscoverables++;
        }
    }
    console.log('now: ' + currentDiscoverables);
    Scorecard.explored(totalDiscoverables,currentDiscoverables);


    //draw masked version of map
    drawBackground(stage);
    stage.context.save();
    stage.context.beginPath();
    stage.context.arc(Hero.x*Hero.percentageX, Hero.y*Hero.percentageY, (stage.sw / 10), 0, 2 * Math.PI, false);
    stage.context.closePath();
    stage.context.clip();
    Map.draw(stage.context,stage.sw,stage.sh,stage.margin);
    stage.context.restore();



    Goal.draw(stage.context,stage.sw,stage.sh,stage.margin);
    Hero.draw(stage.context,stage.sw,stage.sh,stage.margin);
}

function drawBackground(stage) {
    if (stage) {
        stage.context.rect(0,0,stage.sw,stage.sh);
        stage.context.fillStyle = 'rgba(150, 200, 200, 0.8)';
        stage.context.fill();
    }
}

function endSession(achieved) {
    if (play) clearInterval(play);
    if (timer) clearInterval(timer);
    Scorecard.end(achieved);
}