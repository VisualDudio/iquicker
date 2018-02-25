var socket;
var number = 0;
var labels = ["A", "B", "C", "D", "E"];
var resultsBarGraph;
var resultsLookup = {};

var seconds = 00; 
var tens = 00;
var Interval;

function initializeBarGraph() {
    var barData = {
        labels : labels,
        datasets : [
        {
            data : [0, 0, 0, 0, 0]
        }
        ]
    }
    
    var ctx = document.getElementById("chart").getContext("2d");
    
    steps = 10
    max = 10

    resultsBarGraph = new Chart(ctx).Bar(barData, {
            scaleOverride: true,
            scaleSteps: steps,
            scaleStepWidth: Math.ceil(max / steps),
            scaleStartValue: 0,
            scaleShowVerticalLines: true,
            scaleShowGridLines : true,
            barShowStroke : true,
            scaleShowLabels: true
    });
}

function onBarClick(e) {
    var activeBars = resultsBarGraph.getBarsAtEvent(e);
    //TODO: change color of selected bar
    resultsBarGraph.update();
};

$(document).ready(function() {
    socket = io.connect('http://' + document.domain + ':' + location.port);
    
    initializeBarGraph();
    
    $('#chart').on('click', onBarClick);

    $('#nextquestion').on('click', function() {
        window.location.href = '/controlsession';
        socket.emit('new-question');
    });

    $('#playpausebutton').on('click', function() {
        $('#playpausebutton').toggleClass('stop');
        if ($('#playpausebutton').hasClass('stop')) {
            socket.emit('open-question');
        } else {
            socket.emit('close-question');
        }
    });

    socket.on('answer', function(data) {
        var prevIndex = labels.indexOf(data.previousAnswer);
        var index = labels.indexOf(data.answer);
        resultsBarGraph.datasets[0].bars[index].value += 1;
        if (prevIndex != -1 && resultsBarGraph.datasets[0].bars[prevIndex].value != 0) {
            resultsBarGraph.datasets[0].bars[prevIndex].value -= 1;
        }
        
        resultsBarGraph.update();
    });
});