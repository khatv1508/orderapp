const db = require("../models");
const { BillDetail } = db;
const Op = db.Sequelize.Op;

// Create and Save a new BillDetail
exports.create = (req, res) => {
  // Validate request
  if (!req.body.quanity) {
    res.status(400).send({
      message: "Quanity can not be empty!"
    });
    return;
  }

  // Create a BillDetail
  const billDetail = {
    turn_id: req.body.turn_id,
    menu_id: req.body.menu_id ,
    quanity: req.body.quanity ,
    total: req.body.total
  };

  // Save BillDetail in the database
  BillDetail.create(billDetail)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Bill Detail."
      });
    });
};

// Retrieve all BillDetail from the database.
exports.findAll = (req, res) => {
    const quanity = req.query.quanity;
    var condition = quanity 
    ? { quanity: { [Op.eq]: `%${quanity}%` } } 
    : null;

    BillDetail.findAll({ 
        where: condition, 
        include: ["turn"],
        include: ["menu"]
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Bill Detail."
      });
    });
};

// Update a BillDetail by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  BillDetail.update(req.body, {
    where: { id: id }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: "Bill Detail was updated successfully."
      });
    } else {
      res.send({
        message: `Cannot update Bill Detail with id=${id}. Maybe Bill Detail was not found or req.body is empty!`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: `Error updating Bill Detail with id=${id}`
    });
  });
};
