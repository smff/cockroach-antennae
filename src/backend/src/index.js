const _ = require('lodash');
const express = require('express');
const app = require('express')();
const path = require('path');
const http = require('http').Server(app);

const io = require('socket.io')(http);

let users = [];

function generateRoomId() {
    return Date.now();
}

function generateUser(userId) {
    return {
        userId,
        show: false
    };
}

app.use('/', express.static(
    path.resolve(__dirname, '../../frontend')
));

// app.get('/', function(req, res) {
//     res.sendFile(path.resolve(__dirname, '../../frontend/index.html'));
// });

io.on('connection', function(socket) {
    const userId = socket.id;
    console.log(`${userId} connected`);

    const user = generateUser(userId);

    if (users.length === 0) {
        user.show = true;
        socket.emit('show');
    } else if (!_.find(users, { show: true })) {
        user.show = true;
        socket.emit('show');
    } else {
        socket.emit('hide');
        user.show = false;
    }

    users.push(user);

    // let u = _.find(users, { userId });

    users.forEach(u => {
        console.log(u);
    });

    socket.on('click', function(msg) {
        let applicants = _.filter(users, { show: false });
        let winner = applicants[Math.floor(Math.random() * applicants.length)];
        let winnerToWork = _.find(users, { userId: winner.userId });
        user.show = false;
        winnerToWork.show = true;
        socket.emit('hide');
        socket.broadcast.to(winnerToWork.userId).emit('show');
        console.log('----');
        users.forEach(u => {
            console.log(u);
        });
    });

    socket.on('disconnect', function() {
        _.remove(users, { userId });
        let applicants = _.filter(users, { show: false });
        console.log('applicants', applicants, userId);
        if (applicants.length) {
            let winner = applicants[Math.floor(Math.random() * applicants.length)];
            let winnerToWork = _.find(users, { userId: winner.userId });
            socket.broadcast.to(winnerToWork.userId).emit('show');
        }
        console.log(socket.id, 'disconnected');
    });
});

http.listen(3000, function() {
    console.log('Cockroach antennae is on fire!');
});
