const db = require("../models");
const { Table } = db;
const Op = db.Sequelize.Op;

// Create and Save a new Menu
exports.create = (req, res) => {
  // Validate request
  if (!req.body.table_number) {
    res.status(400).send({
      message: "Table number can not be empty!"
    });
    return;
  }

  // Create a Account
  const table = {
    table_number: req.body.table_number
  };

  // Save Account in the database
  Table.create(table)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Table."
      });
    });
};

// Retrieve all Account from the database.
exports.findAll = (req, res) => {
    const table_number = req.query.table_number;
    var condition = table_number 
    ? { table_number: { [Op.eq]: `%${table_number}%` } } 
    : null;

    Table.findAll({ 
      where: condition
    })
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

// Delete a Account with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Table.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Table was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Table with id=${id}. Maybe Table was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Could not delete Table with id=${id}`
      });
    });
};