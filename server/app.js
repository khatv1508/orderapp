const express = require('express');
const { Server } = require("socket.io");
const { createServer } = require("http");

const cors = require("cors");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:3000", "http://192.168.1.39:19000"],
    methods: ["GET", "POST"]
  }
});

var corsOptions = {
  origin: "http://localhost:3000"
};

io.on("connection", (socket) => {
  socket.on("order", (arg) => {
    // console.log(arg);
    socket.broadcast.emit("has-order");
  });
  socket.on("pay", (arg) => {
    // console.log(arg);
    socket.broadcast.emit("has-pay", arg);
  });
  socket.on("chef", (arg) => {
    // console.log(arg);
    socket.broadcast.emit("has-chef", arg);
  });
  socket.on("finish", (arg) => {
    // console.log(arg);
    socket.broadcast.emit("has-finish", `Table ${arg[0]} - Turn ${arg[1]}`);
  });
});
httpServer.listen(5000);

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./src/models");
// db.sequelize.sync();

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// account route
require("./src/routes/account.route")(app);

// menu route
require("./src/routes/menu.route")(app);

// table route
require("./src/routes/table.route")(app);

// bill route
require("./src/routes/bill.route")(app);

// turn route
require("./src/routes/turn.route")(app);

// food type route
require("./src/routes/food_type.route")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});