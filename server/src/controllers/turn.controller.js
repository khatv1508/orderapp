const db = require("../models");
const { Turn } = db;
const Op = db.Sequelize.Op;

// Create and Save a new Turn
exports.create = (req, res) => {
  // Validate request
  if (!req.body.num) {
    res.status(400).send({
      message: "Type id can not be empty!"
    });
    return;
  }

  // Create a Turn
  const turn = {
    num: req.body.num,
    confirm_status: req.body.confirm_status
  };

  // Save Turn in the database
  Turn.create(turn)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Turn."
      });
    });
};

// Retrieve all Turn from the database.
exports.findAll = (req, res) => {
    const num = req.query.num;
    var condition = num 
    ? { num: { [Op.eq]: `%${num}%` } } 
    : null;

    Turn.findAll({ 
      where: condition, 
      include: ["bill"]
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Turn."
      });
    });
};

// Find a single Turn with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Turn.findByPk(id, {
      include: ["bill_details"]
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: `Error retrieving Turn with id=${id}`
      });
    });
};

// Update a Turn by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  // get thong tin Turn 
  Turn.findByPk(id)
  .then(data => {
    //  update total 
    Turn.update(Object.assign({
        confirm_status: 1
      }, data), {
        where: {
          id: id
        }
      }).then(turn => {
        if (turn) {
          res.send({
            message: "Turn was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Turn with id=${id}. Maybe Turn was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || "Some error occurred while creating the Turn."
        });
      });
  })
  .catch(err => {
    res.status(500).send({
      message: `Error updating Turn with id=${id}`
    });
  });
};

