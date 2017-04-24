var timeboxInterval;
var currentTimebox;

var timebox = function(timebox, tick, callback) {
    var totalTimebox = currentTimebox = timebox;

    timeboxInterval = setInterval(function() {
        currentTimebox--;
        tick(currentTimebox, totalTimebox);
        if (currentTimebox <= 0) {
            clearInterval(timeboxInterval);
            callback();
        }
    },1000);
}

timebox.finishHandler = function() {
    if (timeboxInterval) clearInterval(timeboxInterval);
    return currentTimebox;
}