function initialize() {
    var timebox = 10000;
    var timer = setInterval(function() {
        timebox--;
        console.log(timebox);
    },1000);
}