var isQuestionOpen = false;
var previouslySelectedAnswer;
var previousAnswer;

$(document).ready(function() {
    socket = io.connect('http://' + document.domain + ':' + location.port);
    
    socket.on('open-question', function() {
        isQuestionOpen = true;
    });

    socket.on('close-question', function() {
        isQuestionOpen = false;
    });

    socket.on('new-question', function() {
        isQuestionOpen = false;
        //TODO: reset client
    });

    $('.answer').on('click', function(e) {
        if (!isQuestionOpen) {
            return;
        }

        $(e.target).toggleClass('chosen');
        $(previouslySelectedAnswer).toggleClass('chosen');

        if (previouslySelectedAnswer == null) {
            previousAnswer = null;
        } else {
            previousAnswer = $(previouslySelectedAnswer).attr('id').toUpperCase();
        }

        if (previouslySelectedAnswer !== e.target) {
            data = {
                previousAnswer: previousAnswer,
                answer: $(e.target).attr('id').toUpperCase()
            }
            socket.emit('answer', data);
        }

        previouslySelectedAnswer = e.target;
    });
});