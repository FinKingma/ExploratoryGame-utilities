var Map = function(callback) {
    Map.lines = 13;
    generateMap(callback);
};


function generateMap(callback) {
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/api/mapmaker",
        dataType: "json",
        accepts: "application/json",
        headers: {
            "features": "50",
            "bugs": "20"
        },
        success: processData,
        error: function(){ return false;}
    });

    function processData(data)
    {
        Map.grid = data;
        callback(data);
    }
}

Map.prototype.draw = function(context,width,height,margin) {
    Map.context = context;
    Map.sw = width - (margin*2);
    Map.sh = height - (margin*2);
    Map.margin = margin;

    goal = {
        x:0,
        y:0
    };

    for (var keyY in Map.grid) {
        if (Map.grid.hasOwnProperty(keyY)) {
            for (var keyX in Map.grid[keyY]) {
                if (Map.grid[keyY].hasOwnProperty(keyX)) {
                    for (var property in Map.grid[keyY][keyX]) {
                        if (Map.grid[keyY][keyX].hasOwnProperty(property)) {
                            if (Map.grid[keyY][keyX][property] === 'Working' ||
                                Map.grid[keyY][keyX][property] === 'Feature' ||
                                Map.grid[keyY][keyX][property] === 'Broken' ||
                                Map.grid[keyY][keyX][property] === true) {
                                switch(property) {
                                    case "pathRight":
                                        drawHorizontalLine(keyY.split('posY')[1],keyX.split('posX')[1],Map.grid[keyY][keyX][property]);
                                        break;
                                    case "pathDown" :
                                        drawVerticalLine(keyY.split('posY')[1],keyX.split('posX')[1],Map.grid[keyY][keyX][property]);
                                        break;
                                    case "Goal":
                                        goal.x = keyY.split('posY')[1];
                                        goal.y = keyX.split('posX')[1];
                                        break;
                                }
                                //console.log(keyY + ' => ' + keyX + ' => ' + property + ' => '+Map.grid[keyY][keyX][property]
                            }
                        }
                    }

                }
            }
        }
    }
    return goal;
};

function drawHorizontalLine(posY,posX,type) {
    switch(type) {
        case "Working":
            Map.context.strokeStyle = "black";
            break;
        case "Feature":
            Map.context.strokeStyle = "blue";
            break;
        case "Broken":
            Map.context.strokeStyle = "red";
            break;
    }

    Map.context.beginPath();
    var lineX = (posX * (Map.sw / (Map.lines-1)))+Map.margin;
    var lineY = (posY * (Map.sh / (Map.lines-1)))+Map.margin;
    var lineLength = (Map.sw/(Map.lines-1));
    Map.context.moveTo(lineX,lineY);

    if (type === "Broken") {
        var breakSize = Map.sh / Map.lines-40;
        Map.context.lineTo(lineX + (lineLength/7),lineY+breakSize);
        Map.context.lineTo(lineX + (lineLength/5),lineY-breakSize);
        Map.context.stroke();

        Map.context.beginPath();
        Map.context.moveTo(lineX + (lineLength/1.5),lineY+breakSize);
        Map.context.lineTo(lineX + (lineLength/1.2),lineY-breakSize);
    }

    Map.context.lineTo(lineX + lineLength, lineY);
    Map.context.stroke();
}
function drawVerticalLine(posY,posX,type) {
    switch(type) {
        case "Working":
            Map.context.strokeStyle = "black";
            break;
        case "Feature":
            Map.context.strokeStyle = "blue";
            break;
        case "Broken":
            Map.context.strokeStyle = "red";
            break;
    }

    Map.context.beginPath();
    var lineX = (posX * (Map.sw / (Map.lines-1))+Map.margin);
    var lineY = (posY * (Map.sh / (Map.lines-1)))+Map.margin;
    var lineLength = (Map.sh/(Map.lines-1));

    Map.context.moveTo(lineX, lineY);

    if (type === "Broken") {
        var breakSize = Map.sh / Map.lines-40;
        Map.context.lineTo(lineX+breakSize,lineY + (lineLength/7));
        Map.context.lineTo(lineX-breakSize,lineY + (lineLength/5));
        Map.context.stroke();

        Map.context.beginPath();
        Map.context.moveTo(lineX +breakSize,lineY+ (lineLength/1.5));
        Map.context.lineTo(lineX -breakSize,lineY+ (lineLength/1.2));
    }

    Map.context.lineTo(lineX, lineY + lineLength);
    Map.context.stroke();
}