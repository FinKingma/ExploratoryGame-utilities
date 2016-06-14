var scorecard;

var Scorecard = function(widthPercentage,timebox) {
    scorecard = {
        canvas : $('#scorecard'),
        title : $('#title'),
        header : $('#header'),
        timebox : $('#timebox'),
        bugs : $('#bugs'),
        features : $('#features'),
        explored : $('#explored'),
        seconds : timebox
    };

    scorecard.canvas.width = (window.innerWidth * widthPercentage);
    scorecard.canvas.height = window.innerHeight;
    scorecard.canvas.css('width',((window.innerWidth * widthPercentage)-40) + 'px');
    scorecard.canvas.css('max-width',((window.innerWidth * widthPercentage)-40) + 'px');

    scorecard.title.text('Exploratory Testing');
    scorecard.header.text('Session 1');
    scorecard.timebox.text(scorecard.seconds + ' seconds');
    scorecard.bugs.text('no bugs discovered');
    scorecard.features.text('no features discovered');
    scorecard.explored.text('nothing explored');
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
        html += '<li>' + bug + '</li>';
    });
    html += '</ul>';
    scorecard.bugs.html(html);
};

Scorecard.discoveredFeatures = function(featureList) {
    var html = 'Features discovered: ';
    html += '<ul>';
    featureList.forEach(function(feature) {
        html += '<li>' + feature + '</li>';
    });
    html += '</ul>';
    scorecard.features.html(html);
};

Scorecard.explored = function(total,current) {
    var percentage = Math.round((current / total) * 100);
    scorecard.explored.text('Map explored for: ' + percentage + '%');
};

Scorecard.timeboxTick = function() {
    scorecard.seconds--;
    scorecard.timebox.text(scorecard.seconds + ' seconds');

    return scorecard.seconds === 0;
};

Scorecard.end = function(achieved) {
    scorecard.header.text('Session 1 - Completed');
    if (achieved) {
        $('#achieved').text('Goal achieved');
        scorecard.timebox.text('Time remaining: ' + scorecard.seconds + ' seconds');
    } else {
        $('#achieved').text('Goal not achieved...');
        scorecard.timebox.text('');
    }
};