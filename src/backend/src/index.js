const app = require('express')();
const path = require('path');
const http = require('http').Server(app);

const io = require('socket.io')(http);


let users = 0;

app.get('/', function(req, res) {
    res.sendFile(path.resolve(__dirname, '../../frontend/index.html'));
});

io.on('connection', function(socket) {
    console.log('a user connected');
    users++;

    socket.on('click', function(msg) {
        console.log('message: ' + msg);
        io.emit('hi', users);
    });

    socket.on('disconnect', function() {
        users--;
        console.log('user disconnected');
    });
});

http.listen(3000, function() {
    console.log('Cockroach antennae is on fire!');
});
