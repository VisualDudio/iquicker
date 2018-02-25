var socket;

$(document).ready(function() {
    socket = io.connect('http://' + document.domain + ':' + location.port);
    
    socket.on('code', function(code) {
        $('#codeoutput').text(code);
    });

    $('#generate').on('click', function(e) {
        socket.emit('generate-code');
    });

    $('#submit').on('click', function(e) {
        socket.emit('joined', $('#codeoutput').text());
        window.location.href = '/controlsession';
    });
});