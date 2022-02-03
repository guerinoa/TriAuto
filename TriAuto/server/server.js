const Axios = require('axios');
const express = require('express')
const http = require("http");
const app = express()
const port = 4000
const server = http.createServer(app);
const listRoutes = require("./routes/patientList");


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

app.use(express.json());
app.use("/patientList",listRoutes);

app.listen(3001);

io.on('connection', (socket, res) => {
    console.log('a user connected');

    socket.on('joinRoom', room => {
      socket.join(room);
    }) 

    socket.on("submit", (arg) => {
      // Generate a risk level
      arg["risklevel"] = riskLevel();
      arg["id"] = count++;

      // Make a post request
      Axios.post('http://localhost:3001/patientList/create',{
        items: arg
        })

      // Send data to nurse clients
      socket.to('nurseRoom').emit('queue', arg);
    });
});


