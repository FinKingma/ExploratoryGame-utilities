var scorecard;
//100% dependant on HTML

var Scorecard = function(widthPercentage,timebox) {
    scorecard = {
        canvas : $('#scorecard'),
        title : $('#title'),
        scoreText : $('#score'),
        header : $('#header'),
        timeboxText : $('#timebox'),
        timeboxArea : $('#timeboxarea'),
        bugs : $('#bugs'),
        features : $('#features'),
        explored : $('#explored'),
        exploredArea : $('#exploredarea'),
        exploredPercentage : 0,
        seconds : timebox,
        timebox : timebox
    };


    scorecard.canvas.width = (window.innerWidth * widthPercentage);
    scorecard.canvas.height = window.innerHeight;
    scorecard.canvas.css('display','inline');
    scorecard.canvas.css('width',((window.innerWidth * widthPercentage)-40) + 'px');
    scorecard.canvas.css('max-width',((window.innerWidth * widthPercentage)-40) + 'px');

    scorecard.title.text('The Exploratory Testing Game');
    var sessionId = Math.round(Math.random()*99999)+1;
    scorecard.header.text('Session ' + sessionId);
    scorecard.timeboxText.text(scorecard.seconds + ' seconds');
    scorecard.timeboxArea.css('width','100%');
    scorecard.bugs.text('no bugs discovered.');
    scorecard.features.text('no features discovered.');
    scorecard.explored.text('nothing explored');
    scorecard.exploredArea.css('width','0%');

    return scorecard;
};

Scorecard.draw = function(widthPercentage) {
    scorecard.canvas.width = (window.innerWidth * widthPercentage);
    scorecard.canvas.height = window.innerHeight;
    scorecard.canvas.css('width',((window.innerWidth * widthPercentage)-40) + 'px');
    scorecard.canvas.css('max-width',((window.innerWidth * widthPercentage)-40) + 'px');
};

Scorecard.discoveredBugs = function(bugList) {
    var html = 'Bugs discovered: ';
    html += '<ul>';
    bugList.forEach(function(bug) {
        html += '<li>' + bug.name + '</li>';
    });
    html += '</ul>';
    scorecard.bugs.html(html);
};

Scorecard.discoveredFeatures = function(featureList) {
    var html = 'Features discovered: ';
    html += '<ul>';
    featureList.forEach(function(feature) {
        html += '<li>' + feature.name + '</li>';
    });
    html += '</ul>';
    scorecard.features.html(html);
};

Scorecard.explored = function(total,current) {
    var percentage = Math.round((current / total) * 100);
    scorecard.exploredPercentage = percentage;
    scorecard.explored.text('Map explored for: ' + percentage + '%');
    scorecard.exploredArea.css('width',percentage+'%');
};

Scorecard.tickHandler = function(secondsLeft, secondsTotal) {
    scorecard.timeboxText.text(secondsLeft + ' seconds');
    var percentage = (secondsLeft / secondsTotal) * 100;
    scorecard.timeboxArea.css('width',percentage + '%');
};

Scorecard.end = function(achieved, features, bugs, explored, seconds) {
    var points = 0;
    if (achieved) points += 1000;
    console.log('points 1: ' + points);
    features.forEach(function(feature) {
        points+= feature.points;
    });
    console.log('points 2: ' + points);
    bugs.forEach(function(bug) {
        points+= bug.points;
    });
    console.log('points 3: ' + points);
    points *= explored;
    console.log('points 4: ' + points);

    scorecard.header.text('Session 1 - Completed');

    scorecard.scoreText.text('Final score: ' + points);
    if (achieved) {
        $('#achieved').text('Goal achieved');
        scorecard.timeboxText.text('Time remaining: ' + seconds + ' seconds');
    } else {
        $('#achieved').text('Goal not achieved...');
        scorecard.timeboxText.text('Times up.');
    }
};