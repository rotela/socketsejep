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
    console.log('Alguien se conectó');
    // cuando alguien envia un recordatorio
    socket.on('new-recordatorio', function(data) {
        io.sockets.emit('recordatorios', data);
    });

});

server.listen(3000, function() {
    console.log("servidor corriendo en http://localhost:3000");
});
