
const express = require("express");
const bodyParser = require("body-parser");
const mysqlConnection = require("./connection");
const listRoutes = require("./routes/inventorylist");
const cors = require('cors')

var app = express();

app.use(cors());
app.use(express.json());
app.use("/inventorylist",listRoutes);

app.listen(3001);