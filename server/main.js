var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
// definimos una carpeta publica
app.use(express.static('public'));
// programamos
var messages = [{
    texto: 'Hola, bienvenido al servidor',
    autor: 'Servidor',
}];
//
app.get('/', function(req, res) {
    res.status(200).send('Hola mundo!!!');
});
// cuando alguien se conecta
io.on('connection', function(socket) {
    socket.emit('messages', messages);
    // cuando alguien envió un nuevo mensaje
    socket.on('new-message', function(data) {
        messages.push(data);
        io.sockets.emit('messages', messages);
    });
});

server.listen(3000, function() {
    console.log("servidor corriendo en http://localhost:3000");
});