var socket = io.connect('http://192.168.0.10:3000', {
    'forceNew': true
});

socket.on('messages', function(data) {
    render(data);
});

function render(data) {
    var html = data.map(function(data, index) {
        return ("<div><strong>" + data.autor + "</strong>: <em>" + data.texto + "</em></div>");
    }).join(' ');
    document.getElementById('messages').innerHTML = html;
}

function enviarMsg(e) {

    var datos = {
        autor: document.getElementById("autor").value,
        texto: document.getElementById("texto").value
    }

    socket.emit('new-message', datos);
    return false;
}
