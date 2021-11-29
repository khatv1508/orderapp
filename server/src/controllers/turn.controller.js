const { Bill } = require("../models");
const db = require("../models");
const { 
  Turn,
  BillDetail,
  Menu 
} = db;
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
    const status = req.query.status;

    var condition = num 
    ? { num: { [Op.eq]: `%${num}%` } } 
    : status 
    ? { confirm_status: { [Op.eq]: status } } 
    : null;

    Turn.findAll({ 
      where: condition,
      order: [['id', 'DESC']], 
      include: ["bill", {
        model: BillDetail,
        as: 'bill_details', 
        include: {
          model: Menu,
          as: 'menu'
        }
      }]
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
      include: [{
        model: BillDetail,
        as: 'bill_details', 
        include: {
          model: Menu,
          as: 'menu'
        }
      }]
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
  const status = req.query.status;

  // get thong tin Turn 
  Turn.findByPk(id)
  .then(data => {
    //  update total 
    Turn.update(Object.assign({
        confirm_status: status ? status : 1
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

// Retrieve all Turn by id table
exports.findAllByIdTable = (req, res) => {
  const id = req.params.id;
  var condition = id 
  ? { 
    [Op.and]: [{ table_id: { [Op.eq]: id } }, { pay_status: { [Op.eq]: 0 } }],
  } 
  : null;

  // A = Find bill where table id = {} and pay_status = 0
  Bill.findOne({
    where: condition
  })
  .then((bill) => {
    if (!bill) {
      res.send({
        bill: null,
        turns: [],
      }); 
      return;
    }
    // Find all turn where bill id = A.bill_id
    Turn.findAll({
      order: [['num', 'ASC']], 
      include: [{
        model: Bill,
        as: 'bill',
        where: {
          id: { [Op.eq]: bill.id }
        }
      }, {
        model: BillDetail,
        as: 'bill_details', 
        include: {
          model: Menu,
          as: 'menu'
        }
      }]
    })
    .then(data => {
      // Parse data
      let result = {};
      if (data) {
        // Lay thong tin bill
        if (data.length >= 1) {
          result = {
            bill: data[0].bill
          };
        } 
        result = {
          ... result, 
          turns: data[0].bill_details.length === 0 ? [] : data.map((obj, index) => {
          let turnTotal = 0;
          let turnId = 0;
          let arrBillDetails = obj.bill_details && obj.bill_details.map((detail, index) => {
            turnTotal += detail.amount;
            turnId = detail.id;
            return {
              menu_id: detail.menu.id,
              qty: detail.quantity,
              amount: detail.menu.price * detail.quantity,
              food_name: detail.menu.food_name,
              image: detail.menu.image,
              price: detail.menu.price,
            }
          });
          // if (arrBillDetails.length > 0) {
            return {
              id: turnId,
              arr: arrBillDetails,
              total: turnTotal
            }
          // } 
          // return;
        })
      }
        res.send(result);
      }
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Turn."
      });
    });
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving Turn."
    });
  });;
};

