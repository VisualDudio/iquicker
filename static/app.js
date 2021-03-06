var socket;
var number = 0;
var labels = ["A", "B", "C", "D", "E"];
var resultsBarGraph;
var resultsLookup = {};

function initializeBarGraph() {
    var barData = {
        labels : labels,
        datasets : [
        {
            backgroundColor: ["red", "red", "red", "red", "red"],
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
    activeBars[0].backgroundColor[activeBars.index] = "green";
    resultsBarGraph.update();
};

$(document).ready(function() {
    /*socket = io.connect('http://' + document.domain + ':' + location.port);
    socket.emit('joined');
    
    initializeBarGraph();

    $('.answer').on('click', function(e) {
        data = {
            netid: "",
            answer: $(e.target).attr('id').toUpperCase()
        }
        socket.emit('answer', data);
    });
    
    $('#chart').on('click', onBarClick);

    socket.on('answer', function(data) {
        var index = labels.indexOf(data.answer);
        resultsBarGraph.datasets[0].bars[index].value += 1;
        resultsBarGraph.update();
    });*/
});