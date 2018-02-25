$(document).ready(function() {
    socket = io.connect('http://' + document.domain + ':' + location.port);

    $('.course').on('click', function() {
        socket.emit('generate-code');
    });
});