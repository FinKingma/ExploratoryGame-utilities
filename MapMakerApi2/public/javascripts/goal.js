function Goal(goalPos) {
    Goal.x = goalPos.x;
    Goal.y = goalPos.y;
    Goal.size = 40;
}

Goal.draw = function(context,width,height,margin) {
    var context = context;
    Goal.sw = width - (margin*2);
    Goal.sh = height - (margin*2);
    Goal.margin = margin;

    context.beginPath();
    var grd=context.createRadialGradient(
        (Goal.sw/12)*Goal.x,
        (Goal.sh/12)*Goal.y,
        0,
        (Goal.sw/12)*Goal.x+15,
        (Goal.sh/12)*Goal.y+15,
        70);
    grd.addColorStop(0,"yellow");
    grd.addColorStop(1,"green");

    context.arc(
        (Goal.sw/12)*Goal.x + Goal.margin,
        (Goal.sh/12)*Goal.y + Goal.margin,
        Goal.size, 0, 2 * Math.PI, false);


    context.fillStyle = grd;
    context.fill();
};
