const app = require('express')();
const path = require('path');
const http = require('http').Server(app);

const io = require('socket.io')(http);

app.get('/', function(req, res) {
    res.sendFile(path.resolve(__dirname, '../../frontend/index.html'));
});

io.on('connection', function(socket) {
    console.log('a user connected');

    socket.on('click', function(msg) {
        console.log('message: ' + msg);
    });

    socket.on('disconnect', function() {
        console.log('user disconnected');
    });
});

http.listen(3000, function() {
    console.log('Cockroach antennae is on fire!');
});
