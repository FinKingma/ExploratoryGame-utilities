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
        case "touch":
            $("body").on('touchstart', '#gamestage', function(e) {
                mouseX = e.originalEvent.touches[0].pageX;
                mouseY = e.originalEvent.touches[0].pageY;
            });
    }
}

Hero.draw = function(context,width,height,margin) {
    moveHero(context);

    var realX = Hero.x * Hero.percentageX;
    var realY = Hero.y * Hero.percentageY;

    Map.context.lineWidth = 4;
    Map.context.beginPath();
    context.beginPath();
    context.arc(realX, realY, Hero.size, 0, 2 * Math.PI, false);

    var grd=context.createRadialGradient(realX,realY,Hero.size-2,realX+2,realY+2,Hero.size+2);
    grd.addColorStop(0,"black");
    grd.addColorStop(.5,"darkblue");
    grd.addColorStop(1,"#c3c3c3");

    context.strokeStyle = grd;
    context.stroke();
    context.beginPath();

    //draw triangle in the direction
    var direction = Math.atan2(Hero.speedY,Hero.speedX) * 180/Math.PI;
    //console.log(direction);

    //startpos of line
    context.moveTo(
        (Math.cos(direction / (180/Math.PI)) * Hero.size) + realX,
        (Math.sin(direction / (180/Math.PI)) * Hero.size) + realY
    );


    //little degrees up
    context.lineTo(
        (Math.cos((direction+45) / (180/Math.PI)) * Hero.size) + realX,
        (Math.sin((direction+45) / (180/Math.PI)) * Hero.size) + realY
    );

    //pointy part
    context.lineTo(
        (Math.cos(direction / (180/Math.PI)) * (Hero.size*1.5)) + realX,
        (Math.sin(direction / (180/Math.PI)) * (Hero.size*1.5)) + realY
    );

    //little degrees up
    context.lineTo(
        (Math.cos((direction-45) / (180/Math.PI)) * Hero.size) + realX,
        (Math.sin((direction-45) / (180/Math.PI)) * Hero.size) + realY
    );

    context.fillStyle = "darkblue";
    context.fill();
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
    //if pixel is not background
    if (!(pixelX[0] > 80 && pixelX[0] < 155 &&
        pixelX[1] > 163 && pixelX[1] < 203 &&
        pixelX[2] > 163 && pixelX[2] < 203)) {
        Hero.x += Hero.speedX;
    }

    //check for movement Y
    var pixelY = context.getImageData((Hero.x*Hero.percentageX) | 0, ((Hero.y*Hero.percentageY) + Hero.speedY) | 0, 1, 1).data;
    if (!(pixelY[0] > 80 && pixelY[0] < 155 &&
        pixelY[1] > 163 && pixelY[1] < 203 &&
        pixelY[2] > 163 && pixelY[2] < 203)) {
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