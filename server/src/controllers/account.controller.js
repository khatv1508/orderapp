const db = require("../models");
const { Account } = db;
const Op = db.Sequelize.Op;
const dateConvert = require("../helpers/dateConvert");


// Create and Save a new Account
exports.create = (req, res) => {
  // Validate request
  if (!req.body.role_id) {
    res.status(400).send({
      message: "Role id can not be empty!"
    });
    return;
  }
  if (!req.body.account_name) {
    res.status(400).send({
      message: "Account name can not be empty!"
    });
    return;
  }
  if (!req.body.account_pass) {
    res.status(400).send({
      message: "Account pass can not be empty!"
    });
    return;
  }

  // Create a Account
  const account = {
    role_id: req.body.role_id,
    account_name: req.body.account_name,
    account_pass: req.body.account_pass,
    create_date: req.body.create_date,
    update_date: req.body.update_date,
    account_status: req.body.account_status
  };

  // Save Account in the database
  Account.create(account)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Account."
      });
    });
};

// Retrieve all Account from the database.
exports.findAll = (req, res) => {
    const account_name = req.query.account_name;
    var condition = account_name 
    ? { account_name: { [Op.like]: `%${account_name}%` } } 
    : null;

    Account.findAll({ 
      where: condition, 
      include: ["role"]
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Account."
      });
    });
};

// Find a single Account with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Account.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: `Error retrieving Account with id=${id}`
      });
    });
};

// Update a Account by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  const account = {
    role_id: req.body.role_id,
    account_name: req.body.account_name,
    account_pass: req.body.account_pass,
    create_date: dateConvert.stringToDate(req.body.create_date),
    update_date: dateConvert.currentDate(),
    account_status: req.body.account_status
  };


  Account.update(account, {
    where: { id: id }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: "Account was updated successfully."
      });
    } else {
      res.send({
        message: `Cannot update Account with id=${id}. Maybe Account was not found or req.body is empty!`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: `Error updating Account with id=${id}`
    });
  });
};

// Delete a Account with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Account.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Account was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Account with id=${id}. Maybe Account was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Could not delete Account with id=${id}`
      });
    });
};