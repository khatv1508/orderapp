const db = require("../models");
const { Table } = db;
const Op = db.Sequelize.Op;

// Create and Save a new Table
exports.create = (req, res) => {
  // Validate request
  if (!req.body.table_number) {
    res.status(400).send({
      message: "Table number can not be empty!"
    });
    return;
  }

  // Create a Table
  const table = {
    table_number: req.body.table_number
  };

  // Save Table in the database
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

// Retrieve all Table from the database.
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

// Delete a Table with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Table.destroy({
    where: { table_id: id }
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