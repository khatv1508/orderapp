const db = require("../models");
const { FoodType } = db;
const Op = db.Sequelize.Op;

// Create and Save a new Food Type
exports.create = (req, res) => {
    // Validate request
    if (!req.body.type_name) {
      res.status(400).send({
        message: "Type name can not be empty!"
      });
      return;
    }
  
    // Create a Menu
    const foodType = {
      type_id: req.body.type_id,
      type_name: req.body.type_name,
    };
  
    // Save Menu in the database
    FoodType.create(foodType)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the menu."
        });
      });
};

// Retrieve all Food Type from the database.
exports.findAll = (req, res) => {
    const type_name = req.query.type_name;
    var condition = type_name 
    ? { 
        type_name: { [Op.eq]: `%${type_name}%` }
    } 
    : null;
  
    FoodType.findAll({where: condition})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Table."
      });
    });
  };

// Find a single Food Type with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    FoodType.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: `Error retrieving Food Type with id=${id}`
      });
    });
};