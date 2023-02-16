const express = require('express');
const app = express();
const http = require('http').createServer(app);
const cors = require('cors');
const socketio = require('socket.io');
http.listen(5000);
const io = socketio(http, {
    cors: {
        origin: "http://localhost:3000"
    }
});

// app.get('/', (req,res) => {
//     console.log("Running");
//     res.send("Working")
// })
io.on('connection', (socket) => {    
    console.log('Socket Connected server side '+ socket.id);
    socket.on('createRoom', name => {
        console.log("The room name is" + name);
    });
    // socket.on('disconnect', () => {
    //     console.log('🔥: A user disconnected');
    // });
});