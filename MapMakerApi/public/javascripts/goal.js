goal = this;

var options = [];
    options[0] = false; //LU
    options[1] = false; //LD
    options[2] = false; //RU
    options[3] = false; //RD
    options[4] = false; //UL
    options[5] = false; //UR
    options[6] = false; //DL
    options[7] = false; //DR

function containsTrue(array) {
    for (var i=0;i<array.length;i++) {
        if (array[i] === true) {
            return true;
        }
    }
    return false;
}
goal.defineGoal = function(data) {
    try {
        options[0] = pathLeftUpOpen(data);
        options[1] = pathLeftDownOpen(data);
        options[2] = pathRightUpOpen(data);
        options[3] = pathRightDownOpen(data);
        options[4] = pathUpLeftOpen(data);
        options[5] = pathUpRightOpen(data);
        options[6] = pathDownLeftOpen(data);
        options[7] = pathDownRightOpen(data);
    } catch(err) {
        console.log('crash');
        return false;
    }

    if (!containsTrue(options)) {
        console.log('all paths are broken');
        return false;
    } else {

    }

    var luckyNumber;
    do {
        luckyNumber = Math.floor((Math.random() * 8));
    }
    while (options[luckyNumber] === false);

    switch(luckyNumber) {
        case 0: //LU
            data["posY0"]["posX3"]["Goal"] = true;
            console.log('Goal @ left up');
            break;
        case 1: //LD
            data["posY0"]["posX9"]["Goal"] = true;
            console.log('Goal @ left down');
            break;
        case 2: //RU
            data["posY12"]["posX3"]["Goal"] = true;
            console.log('Goal @ right up');
            break;
        case 3: //RD
            data["posY12"]["posX9"]["Goal"] = true;
            console.log('Goal @ right down');
            break;
        case 4: //UL
            data["posY3"]["posX0"]["Goal"] = true;
            console.log('Goal @ up left');
            break;
        case 5: //UR
            data["posY9"]["posX0"]["Goal"] = true;
            console.log('Goal @ up right');
            break;
        case 6: //DL
            data["posY3"]["posX12"]["Goal"] = true;
            console.log('Goal @ down left');
            break;
        case 7: //DR
            data["posY9"]["posX12"]["Goal"] = true;
            console.log('Goal @ down right');
            break;
    }
    return data;
};

function pathLeftUpOpen(data) {
    return (pathLeftOpen(data) &&
        data["posY5"]["posX0"]["pathDown"] === "Working" &&
        data["posY4"]["posX0"]["pathDown"] === "Working" &&
        data["posY3"]["posX0"]["pathDown"] === "Working")
}
function pathLeftDownOpen(data) {
    return (pathLeftOpen(data) &&
        data["posY6"]["posX0"]["pathDown"] === "Working" &&
        data["posY7"]["posX0"]["pathDown"] === "Working" &&
        data["posY8"]["posX0"]["pathDown"] === "Working")
}
function pathLeftOpen(data) {
    return (data["posY6"]["posX5"]["pathRight"] === "Working" &&
        data["posY6"]["posX4"]["pathRight"] === "Working" &&
        data["posY6"]["posX3"]["pathRight"] === "Working" &&
        data["posY6"]["posX2"]["pathRight"] === "Working" &&
        data["posY6"]["posX1"]["pathRight"] === "Working" &&
        data["posY6"]["posX0"]["pathRight"] === "Working")
}
function pathRightUpOpen(data) {
    return (pathRightOpen(data) &&
    data["posY5"]["posX12"]["pathDown"] === "Working" &&
    data["posY4"]["posX12"]["pathDown"] === "Working" &&
    data["posY3"]["posX12"]["pathDown"] === "Working")
}
function pathRightDownOpen(data) {
    return (pathRightOpen(data) &&
    data["posY6"]["posX12"]["pathDown"] === "Working" &&
    data["posY7"]["posX12"]["pathDown"] === "Working" &&
    data["posY8"]["posX12"]["pathDown"] === "Working")
}
function pathRightOpen(data) {
    return (data["posY6"]["posX6"]["pathRight"] === "Working" &&
        data["posY6"]["posX7"]["pathRight"] === "Working" &&
        data["posY6"]["posX8"]["pathRight"] === "Working" &&
        data["posY6"]["posX9"]["pathRight"] === "Working" &&
        data["posY6"]["posX10"]["pathRight"] === "Working" &&
        data["posY6"]["posX11"]["pathRight"] === "Working")
}
function pathUpLeftOpen(data) {
    return (pathUpOpen(data) &&
    data["posY0"]["posX5"]["pathRight"] === "Working" &&
    data["posY0"]["posX4"]["pathRight"] === "Working" &&
    data["posY0"]["posX3"]["pathRight"] === "Working")
}
function pathUpRightOpen(data) {
    return (pathUpOpen(data) &&
    data["posY0"]["posX6"]["pathRight"] === "Working" &&
    data["posY0"]["posX7"]["pathRight"] === "Working" &&
    data["posY0"]["posX8"]["pathRight"] === "Working")
}
function pathUpOpen(data) {
    return (data["posY5"]["posX6"]["pathDown"] === "Working" &&
        data["posY4"]["posX6"]["pathDown"] === "Working" &&
        data["posY3"]["posX6"]["pathDown"] === "Working" &&
        data["posY2"]["posX6"]["pathDown"] === "Working" &&
        data["posY1"]["posX6"]["pathDown"] === "Working" &&
        data["posY0"]["posX6"]["pathDown"] === "Working")
}
function pathDownLeftOpen(data) {
    return (pathDownOpen(data) &&
    data["posY12"]["posX5"]["pathRight"] === "Working" &&
    data["posY12"]["posX4"]["pathRight"] === "Working" &&
    data["posY12"]["posX3"]["pathRight"] === "Working")
}
function pathDownRightOpen(data) {
    return (pathDownOpen(data) &&
    data["posY12"]["posX6"]["pathRight"] === "Working" &&
    data["posY12"]["posX7"]["pathRight"] === "Working" &&
    data["posY12"]["posX8"]["pathRight"] === "Working")
}
function pathDownOpen(data) {
    return (data["posY6"]["posX6"]["pathDown"] === "Working" &&
        data["posY7"]["posX6"]["pathDown"] === "Working" &&
        data["posY8"]["posX6"]["pathDown"] === "Working" &&
        data["posY9"]["posX6"]["pathDown"] === "Working" &&
        data["posY10"]["posX6"]["pathDown"] === "Working" &&
        data["posY11"]["posX6"]["pathDown"] === "Working")
}
module.exports = goal;