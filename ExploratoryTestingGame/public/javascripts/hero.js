var movLeft = 0;
var movRight = 0;
var movUp = 0;
var movDown = 0;

var mouseX = 0;
var mouseY = 0;
var visitedPos = {
    x: [],
    y: []
};


function Hero(controls, gameWidth) {
    Hero.controls = controls;
    Hero.size = 30;
    Hero.x = (window.innerWidth / 2) * gameWidth;
    Hero.y = window.innerHeight / 2;
    Hero.speedX = 0;
    Hero.speedY = 0;
    Hero.friction = 1.10;
    Hero.percentageX = 1;
    Hero.percentageY = 1;
    Hero.originalSWidth = window.innerWidth;
    Hero.originalSHeight = window.innerHeight;
    visitedPos.x.push(Hero.x | 0);
    visitedPos.y.push(Hero.y | 0);

    switch(controls) {
        case "keyboard":
            console.log('yeeey');
            $("body").keydown(function(e) {
                ek = e.keyCode;
                if (ek==37) movLeft=1;
                if (ek==39) movRight=1;
                if (ek==38) movUp=1;
                if (ek==40) movDown=1;
            })
        .keyup(function(e) {
                ek = e.keyCode;
                if (ek==37) movLeft=0;
                if (ek==39) movRight=0;
                if (ek==38) movUp=0;
                if (ek==40) movDown=0;
            });
            break;
        case "mouse":
            $("body").mousemove(function(event) {
                mouseX = event.pageX;
                mouseY = event.pageY;
            });
            break;
    }
}

Hero.draw = function(context,width,height,margin) {
    moveHero(context);
    Map.context.lineWidth = 3;
    Map.context.beginPath();
    context.beginPath();
    context.arc(Hero.x * Hero.percentageX, Hero.y * Hero.percentageY, Hero.size, 0, 2 * Math.PI, false);
    context.strokeStyle = "blue";
    context.stroke();
};

function moveHero(context) {
    if (Hero.controls === 'keyboard') {
        if (movLeft) Hero.speedX--;
        if (movRight) Hero.speedX++;
        if (movUp) Hero.speedY--;
        if (movDown) Hero.speedY++;
    } else {
        if (!(mouseX === 0 && mouseY === 0)) {
            Hero.speedX = (mouseX - Hero.x) / 25;
            Hero.speedY = (mouseY - Hero.y) / 25;
        }
    }

    Hero.percentageX = window.innerWidth / Hero.originalSWidth;
    Hero.percentageY = window.innerHeight / Hero.originalSHeight;

    Hero.speedX /= Hero.friction;
    Hero.speedY /= Hero.friction;

    var pixelX = context.getImageData(((Hero.x*Hero.percentageX) + Hero.speedX) | 0, (Hero.y*Hero.percentageY) | 0, 1, 1).data;
    if (pixelX[0] === 0 && pixelX[1] === 0) {
        Hero.x += Hero.speedX;
    }

    //check for movement Y
    var pixelY = context.getImageData((Hero.x*Hero.percentageX) | 0, ((Hero.y*Hero.percentageY) + Hero.speedY) | 0, 1, 1).data;
    if (pixelY[0] === 0 && pixelY[1] === 0) {
        Hero.y += Hero.speedY;
    }

    bounceBack(context);
    checkForPickups();

    Hero.x = Math.round(Hero.x);
    Hero.y = Math.round(Hero.y);

    if ((Math.abs(visitedPos.x[visitedPos.x.length-1] - Hero.x) >= 40) ||
        (Math.abs(visitedPos.y[visitedPos.y.length-1] - Hero.y) >= 40)) {
        visitedPos.x.push(Hero.x | 0);
        visitedPos.y.push(Hero.y | 0);
    }
}

Hero.getVisitedPos = function() {
    return visitedPos;
};

function bounceBack(context) {
    var pixelX = context.getImageData(((Hero.x*Hero.percentageX) + 1) | 0, (Hero.y*Hero.percentageY) | 0, 1, 1).data;
    if (!(pixelX[0] === 0 && pixelX[1] === 0)) {
        Hero.x--;
    }
    var pixelX = context.getImageData(((Hero.x*Hero.percentageX) - 1) | 0, (Hero.y*Hero.percentageY) | 0, 1, 1).data;
    if (!(pixelX[0] === 0 && pixelX[1] === 0)) {
        Hero.x++;
    }
    var pixelX = context.getImageData((Hero.x*Hero.percentageX) | 0, ((Hero.y*Hero.percentageY) + 1) | 0, 1, 1).data;
    if (!(pixelX[0] === 0 && pixelX[1] === 0)) {
        Hero.y--;
    }
    var pixelX = context.getImageData((Hero.x*Hero.percentageX) | 0, ((Hero.y*Hero.percentageY) - 1) | 0, 1, 1).data;
    if (!(pixelX[0] === 0 && pixelX[1] === 0)) {
        Hero.y++;
    }
}