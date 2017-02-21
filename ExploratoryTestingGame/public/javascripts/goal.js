function Goal(goalPos) {
    Goal.x = goalPos.x;
    Goal.y = goalPos.y;
    Goal.size = 10;

}

Goal.draw = function(context,width,height,margin) {
    Goal.sw = width - (margin*2);
    Goal.sh = height - (margin*2);
    Goal.margin = margin;
    Goal.size = (Goal.sw/10);

    $('#goal').css('background-size',Goal.size+'px ' + Goal.size+'px');
    $('#goal').css('width',Goal.size+'px');
    $('#goal').css('height',Goal.size+'px');
    $('#goal').css('left',(Goal.sw/12)*Goal.x + Goal.margin - (Goal.size/2)+'px');
    $('#goal').css('top',(Goal.sh/12)*Goal.y + Goal.margin - (Goal.size)+'px');


    /*context.beginPath();
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
    context.fill();*/
};