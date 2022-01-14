const express = require('express')
const http = require("http");
const app = express()
const port = 4000
const server = http.createServer(app);

// Allows cross origin requests
const io = require("socket.io")(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

app.get('/', (req, res) => {
  res.send('Hello World!')
})

io.on('connection', (socket, res) => {
    console.log('a user connected');
    socket.on("submit", (arg) => {
        console.log(arg);
    });
});

// app.post('/', function (req, res) {
//     res.send('Got a POST request')
//   })

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

