const express = require('express')
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8001"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./src/models");
db.sequelize.sync();

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// menu route
require("./src/routes/menu.route")(app);

// account route
require("./src/routes/accounts.route")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});