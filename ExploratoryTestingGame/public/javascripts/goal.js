function Goal(goalPos) {
    Goal.x = goalPos.x;
    Goal.y = goalPos.y;
}

Goal.prototype.draw = function(context,width,height,margin) {
    console.log("x: " + Goal.x);
    console.log("y: " + Goal.y);
    Goal.context = context;
    Goal.sw = width - (margin*2);
    Goal.sh = height - (margin*2);
    Goal.margin = margin;

    Map.context.beginPath();
    var grd=context.createRadialGradient(
        (Goal.sw/12)*Goal.x,
        (Goal.sh/12)*Goal.y,
        0,
        (Goal.sw/12)*Goal.x+15,
        (Goal.sh/12)*Goal.y+15,
        70);
    grd.addColorStop(0,"yellow");
    grd.addColorStop(1,"green");

    Map.context.arc(
        (Goal.sw/12)*Goal.x + Goal.margin,
        (Goal.sh/12)*Goal.y + Goal.margin,
        40, 0, 2 * Math.PI, false);


    Map.context.fillStyle = grd;
    Map.context.fill();
};
