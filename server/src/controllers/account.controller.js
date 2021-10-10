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
    create_date: dateConvert.currentDate(),
    update_date: dateConvert.currentDate(),
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

// Reset password Account
exports.resetPass = (req, res) => {
  const id = req.params.id;
  const account_pass = req.body.account_pass;

  Account.update({account_pass: account_pass}, {
    where: { id: id }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: "Account was reset password Account successfully."
      });
    } else {
      res.send({
        message: `Cannot reset password Account with id=${id}. Maybe Account was not found or req.body is empty!`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: `Error resetting password Account with id=${id}`
    });
  });
};

// Check old password Account
exports.checkPass = (req, res) => {
  const id = req.params.id;
  const account_pass = req.body.account_pass;

  Account.findByPk(id)
  .then(data => {
    if(data.account_pass == account_pass){
      res.send({
        message: `true`
      });
    } else {
      res.send({
        message: `false`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: `Error retrieving Account with id=${id}`
    });
  });
};

// Check user name Account
exports.checkAccount = (req, res) => {
  // const id = req.params.id;
  const account_name = req.body.account_name;
  const account_pass = req.body.account_pass;

  Account.findAll({
    where: {
      [Op.and]: [
        { account_name: { [Op.eq]: account_name }},
        { account_pass: { [Op.eq]: account_pass }}
      ]
    } 
  })
  .then(data => {
    if(data[0].account_name == account_name && data[0].account_pass == account_pass){
      res.send({
        id: data[0].id,
        account_name: data[0].account_name,
        role_id: data[0].role_id,
      });
    } else {
      res.send({
        message: `false`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: `Error retrieving Account with id=${id}`
    });
  });
};