const Axios = require('axios');
const express = require('express')
const http = require("http");
const app = express()
const port = 4000
const server = http.createServer(app);
const listRoutes = require("./routes/patientList");
const cors = require('cors')


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

app.use(cors());
app.use(express.json());
app.use("/patientList",listRoutes);


io.on('connection', (socket, res) => {
    console.log('a user connected');

    socket.on('joinRoom', room => {
      socket.join(room);
    })
    
    socket.on('message', (msg) => {
      console.log("message: " + msg);
    });

    socket.on("submit", (arg) => {
      // Generate a risk level
      arg["risklevel"] = riskLevel();
      arg["id"] = count++;

      // Make a post request
      Axios.post('http://localhost:4000/patientList/create',{
        items: arg}).then(response => console.log(response))

      // Send data to nurse clients
      socket.to('nurseRoom').emit('queue', arg);
    });
});

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


