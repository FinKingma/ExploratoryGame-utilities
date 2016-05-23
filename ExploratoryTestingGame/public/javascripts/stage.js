
//var goal = new Goal();

var map = new Map();
Stage();

window.setTimeout(drawStage,1000);
/*var play = setInterval(function() {

},25);*/

function drawStage() {
    drawBackground();
    var goalPos = map.draw(Stage.context,Stage.sw,Stage.sh,Stage.margin);
    var goal = new Goal(goalPos);
    goal.draw(Stage.context,Stage.sw,Stage.sh,Stage.margin);
}

function Stage() {
    Stage.canvas = document.getElementById("gamestage");
    Stage.context = Stage.canvas.getContext("2d");
    Stage.margin = 20;
    Stage.sw = window.innerWidth;
    Stage.sh = window.innerHeight;
    Stage.canvas.width = window.innerWidth;
    Stage.canvas.height = window.innerHeight;
}
Stage.prototype.constructor = Stage;

function drawBackground() {
    Stage.context.rect(0,0,Stage.sw,Stage.sh);
    Stage.context.fillStyle = 'rgba(150, 200, 200, 0.8)';
    Stage.context.fill();
}