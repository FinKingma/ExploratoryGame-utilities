



var visitedPos = {
    x: [],
    y: []
};

function drawGeneral() {
    //draw history background
    drawBackground();
    context.save();
    context.beginPath();
    for (var i = 0;i<visitedPos.x.length; i++) {
        //context.beginPath();
        context.arc(visitedPos.x[i], visitedPos.y[i], 60, 0, 2 * Math.PI, false);
        //context.closePath();
    }
    context.closePath();
    context.clip();
    drawBugs();
    drawFeatures();
    drawGrid();

    if (!canvasData) {
        canvasData = context.getImageData(0, 0, sw, sh).data;
    }

    context.restore();

    //draw hero background
    drawBackground();
    context.save();
    context.beginPath();
    context.arc(Hero.posX, Hero.posY, 60, 0, 2 * Math.PI, false);
    context.closePath();
    context.clip();
    drawBugs();
    drawFeatures();
    drawGrid();
    context.restore();

    drawHero();
    drawGoal();
}

function gotoEnd(goal) {
    clearInterval(heroInterval);
    clearInterval(rememberVisited);
    clearInterval(clocktimer);
    finalCanvasData  = context.getImageData(0, 0, sw, sh).data;
    var explored = 0;
    var total = 0;
    for (var i=0;i<(canvasData.length/4);i++) {

        if (canvasData[(i*4)] !== 150 && canvasData[(i*4)+1] !== 200 && canvasData[(i*4)+2] !== 200) {
            total++;
            if (finalCanvasData[(i*4)] !== 150 &&
                finalCanvasData[(i*4)+1] !== 200 &&
                finalCanvasData[(i*4)+2] !== 200) {
                explored++;
            }
        }
    }
    document.getElementById("timeboxHolder").style.display = 'none';
    document.getElementById("explorationHolder").style.display = 'block';
    document.getElementById("goalHolder").style.display = 'block';
    document.getElementById("scoreHolder").style.display = 'block';
    document.getElementById("goal").innerText = goal? 'Yes! :)' : 'No :(';
    var points = 0;
    points += (discoveredBugs.length * 100);
    points += (discoveredFeatures.length * 100);
    if (goal) {
        points += 1000;
    }
    points *= (explored/total);
    document.getElementById("score").innerText = Math.round(points);

    document.getElementById("exploration").innerText = Math.round((explored / total) * 100) + '%';
}
