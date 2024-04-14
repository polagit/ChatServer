const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

io.on('connection', socket => {
  console.log('A new client connected');

  socket.on('message', data => {
    console.log('Received:', data);
    // Broadcast the message to all clients
    io.emit('message', data);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
