var margin = window.innerWidth/15;
var scorecardWidth = .3;
var gameWidth = .7;
var timebox = 30;
var skipWait = $("#skipWait").val();
if (skipWait == 'true') {
    timebox = 1;
}

var play;
var totalDiscoverables;
var currentDiscoverables;
var tempStage = Stage();
tempStage.canvas.width = tempStage.sw = window.innerWidth;
$(document).ready(function() {
    GetReadyStage(tempStage, function() {
        startGame();
    });
});

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
                        endSession(false, Discoverables.BugsFound, Discoverables.FeaturesFound, scorecard.exploredPercentage);
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
        if (!(startingCanvasData[(i*4)] > 80 && startingCanvasData[(i*4)] < 155 &&
            startingCanvasData[(i*4)+1] > 163 && startingCanvasData[(i*4)+1] < 203 &&
            startingCanvasData[(i*4)+2] > 163 && startingCanvasData[(i*4)+2] < 203)) {
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
                                        Discoverables.discoverFeature(Scorecard);
                                    }
                                    if (Map.grid[keyY][keyX][property] === 'Broken') {
                                        Map.grid[keyY][keyX][property] = 'BugFound';
                                        Discoverables.discoverBug(Scorecard);
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
    if (dist <= ((Goal.size/2) + (Hero.size/2))) {
        endSession(true, Discoverables.BugsFound, Discoverables.FeaturesFound, scorecard.exploredPercentage);
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
        if (!(canvasData[(j*4)] > 80 && canvasData[(j*4)] < 155 &&
            canvasData[(j*4)+1] > 163 && canvasData[(j*4)+1] < 203 &&
            canvasData[(j*4)+2] > 163 && canvasData[(j*4)+2] < 203)) {
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
        var my_gradient=stage.context.createLinearGradient(0,0,0,stage.sh);
        my_gradient.addColorStop(0,'rgba(154,202,202,0.8)');
        my_gradient.addColorStop(1,'rgba(81,164,164,0.8)');
        stage.context.fillStyle=my_gradient;
        stage.context.fillRect(0,0,stage.sw,stage.sh);
    }
}

function endSession(achieved, features, bugs, explored) {
    if (play) clearInterval(play);
    if (timer) clearInterval(timer);
    Scorecard.end(achieved, features, bugs, explored);
}