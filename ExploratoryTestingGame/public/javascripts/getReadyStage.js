function GetReadyStage(stage, callback) {
    var seconds = 5;

    var my_gradient=stage.context.createLinearGradient(0,0,0,stage.sh);
    my_gradient.addColorStop(0,'rgba(154,202,202,0.8)');
    my_gradient.addColorStop(1,'rgba(81,164,164,0.8)');
    stage.context.fillStyle=my_gradient;
    stage.context.fillRect(0,0,stage.sw,stage.sh);

    $('#description').text('Reach the goal and discover stuff within the timebox.');
    $('#getReadyText').text('Get ready..');
    $('#secondsText').text(seconds);
    $('#hint').text('"Only pause your session if your house is on fire."');

    var tensionTimer = setInterval(function() {
        seconds--;

        $('#secondsText').text(seconds);

        if (seconds === 0) {
            clearInterval(tensionTimer);
            $('#getReady').css('display','none');
            callback();
        }
    },1000);
}