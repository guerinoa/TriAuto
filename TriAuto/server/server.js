const express = require('express')
const http = require("http");
const app = express()
const port = 4000
const server = http.createServer(app);

let count = 1;

// Allows cross origin requests
const io = require("socket.io")(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

function riskLevel() {
  // Algorithm will go here
  return 5;
}

app.get('/', (req, res) => {
  res.send('Hello World!')
})

io.on('connection', (socket, res) => {
    console.log('a user connected');

    socket.on('joinRoom', room => {
      socket.join(room);
    }) 

    socket.on("submit", (arg) => {
      // Generate a risk level
      arg["risk"] = riskLevel();
      arg["id"] = count++;

      // Send data to nurse clients
      socket.to('nurseRoom').emit('queue', arg);
    });
});

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

