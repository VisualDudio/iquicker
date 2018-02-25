var socket;

$(document).ready(function() {
    socket = io.connect('http://' + document.domain + ':' + location.port);

    $('#sessionCode').on('click', function() {
        socket.emit('join-session', $('#sessionCode').text());
    });
});