const _ = require('lodash');
const express = require('express');
const app = require('express')();
const path = require('path');
const http = require('http').Server(app);
const io = require('socket.io')(http);
//------
const User = require('./models/User');
const UserStorage = require('./models/UserStorage');
const Logger = require('./utils/Logger');
//------
const userStorage = new UserStorage();
//------

app.use('/', express.static(
    path.resolve(__dirname, '../../frontend')
));
//------

io.on('connection', function(socket) {
    Logger.connected(socket.id);

    const user = new User(socket.id);

    // if (userStorage.number() === 0) {
    //     user.show = true;
    //     socket.emit('show');
    // } else if (!_.find(users, { show: true })) {
    //     user.show = true;
    //     socket.emit('show');
    // } else {
    //     socket.emit('hide');
    //     user.show = false;
    // }

    userStorage.add(user);

    // // let u = _.find(users, { userId });
    //
    // users.forEach(u => {
    //     console.log(u);
    // });

    socket.on('click', function(msg) {
        Logger.click(socket.id);
        // let applicants = _.filter(users, { show: false });
        // let winner = applicants[Math.floor(Math.random() * applicants.length)];
        // let winnerToWork = _.find(users, { userId: winner.userId });
        // user.show = false;
        // winnerToWork.show = true;
        // socket.emit('hide');
        // socket.broadcast.to(winnerToWork.userId).emit('show');
        // console.log('----');
        // users.forEach(u => {
        //     console.log(u);
        // });
    });

    socket.on('wentOverTheEdge', (msg) => {
        Logger.wentOverTheEdge(socket.id, msg);
        // io.emit('show', { type: 'right', c: msg.c });
        socket.broadcast.emit('show', { type: 'right', c: msg.c });
    });

    socket.on('disconnect', function() {
        // _.remove(users, { userId });
        // let applicants = _.filter(users, { show: false });
        // if (applicants.length) {
        //     let winner = applicants[Math.floor(Math.random() * applicants.length)];
        //     let winnerToWork = _.find(users, { userId: winner.userId });
        //     socket.broadcast.to(winnerToWork.userId).emit('show');
        // }
        Logger.disconnected(socket.id);
    });
});

http.listen(3000, Logger.log('Cockroach antennae is on fire!'));
