const db = require("../models");
const {
  Bill,
  Turn,
  BillDetail,
  Account, 
  Table, 
  Menu
} = db;
const Op = db.Sequelize.Op;
const dateConvert = require("../helpers/dateConvert");

// ham tinh tong
const getTotal = (total, details) => {
  details && details.forEach(element => {
    total += element.amount;
  });
  return total;
}

// ham insert turn va bill detail
const insertTurnBillDetail = async (tmp_bill_id, details) => {
  // kiem tra bill_id
  // count turn where bill_id = tmp_bill_id
  let result = await Turn.findAndCountAll({
      where: {
        bill_id: {
          [Op.eq]: tmp_bill_id
        }
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Bill."
      });
    });

  //  create turn
  let num = result.count;
  const turn = {
    bill_id: tmp_bill_id,
    num: num + 1,
    confirm_status: 0
  };

  // tao turn
  let turnResult = await Turn.create(turn)
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Turn."
      });
    });

  // insert turn 
  let tmp_turn_id = turnResult.id;
  details && details.forEach(element => {
    const billDetail = {
      turn_id: tmp_turn_id,
      menu_id: element.menu_id,
      quantity: element.quantity,
      amount: element.amount
    };
    // insert bill detail
    BillDetail.create(billDetail)
      .catch(err => {
        res.status(500).send({
          message: err.message || "Some error occurred while creating the Bill Detail."
        });
      });
  });
}

const validate = async (reqBody) => {
  let message = "";

  if (reqBody.bill_id) {
    let bill = await Bill.findByPk(reqBody.bill_id);
    if (!bill) {
      message = message.concat("Bill is doesn't exist! ");
    }
  }

  if (!reqBody.account_id) {
    message = message.concat("Account id can not be empty! ");
  } else {
    let account = await Account.findByPk(reqBody.account_id);
    if (!account) {
      message = message.concat("Account is doesn't exist! ");
    }
  }

  if (!reqBody.table_id) {
    message = message.concat("Table id can not be empty! ");
  } else {
    let table = await Table.findByPk(reqBody.table_id);
    if (!table) {
      message = message.concat("Table is doesn't exist! ");
    }
  }

  if (!reqBody.details || reqBody.details.length === 0) {
    message = message.concat("Details id can not be empty! ");
  } else {
      for(let i = 0; i < reqBody.details.length; i++) {
        if (!reqBody.details[i].menu_id) {
            message = message.concat("Menu id can not be empty! ");
        } else {
          let menu = await Menu.findByPk(reqBody.details[i].menu_id);
          if (!menu) {
            message = message.concat(`Menu: ${reqBody.details[i].menu_id} is doesn't exist! `);
          }
        }

        if (!reqBody.details[i].quantity || reqBody.details[i].quantity < 0) {
          message = message.concat("Quantity is invalid ");
        }
  
        if (!reqBody.details[i].amount || reqBody.details[i].amount < 0) {
          message = message.concat("Amount is invalid ");
        } 
      }
  }

  

  return message;
}

// Create and Save a new Bill
exports.order = async (req, res) => {
  // Validate request 
  let message = await validate(req.body);
  if(message) {
    res.status(500).send({
      message: message
    });
    return;
  }

  const {
    bill_id,
    table_id,
    account_id,
    details
  } = req.body;

  // Create a Bill
  const bill = {
    table_id: table_id,
    account_id: account_id,
    check_in: dateConvert.currentDate(), //parse to date 
    check_out: "", //parse to date
    pay_status: 0
  };

  //  goi lan 1
  if (!bill_id) {
    // Save Bill in the database
    Bill.create(Object.assign({
        total: getTotal(0, details)
      }, bill))
      .then(async data => {
        await insertTurnBillDetail(data.id, details);
        res.send({
          message: "Order success!",
          content: {
            bill_id: data.id
          }
        });
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || "Some error occurred while creating the Bill."
        });
      });
  } else {
    // get thong tin bill 
    Bill.findByPk(bill_id)
      .then(async data => {
        //  update total 
        await Bill.update(Object.assign({
            total: getTotal(data.total, details)
          }, bill), {
            where: {
              id: bill_id
            }
          })
          .catch(err => {
            res.status(500).send({
              message: err.message || "Some error occurred while creating the Bill."
            });
          });

        // insert turn va bill detail
        await insertTurnBillDetail(data.id, details);

        //  tra ve ket qua
        res.send({
          message: "Order success!",
          content: {
            bill_id: data.id
          }
        });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Bill with id=" + bill_id
        });
      });
  }
};

// Retrieve all Bill from the database.
exports.findAll = (req, res) => {
  const check_in = req.query.check_in;
  var condition = check_in ?
    {
      check_in: {
        [Op.like]: `%${check_in}%`
      }
    } :
    null;

  Bill.findAll({
      where: condition,
      include: ["table", "account"],
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Bill."
      });
    });
};

// Find a single Bill with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Bill.findByPk(id, {
      include: ["table", "account", {
        model: Turn,
        as: 'turns',
        include: {
          model: BillDetail,
          as: 'bill_details'
        }
      }]
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Bill with id=" + id
      });
    });
};

//  pay bill 
exports.payBill = (req, res) => {
  const bill_id = req.params.id;
  // get thong tin bill 
  Bill.findByPk(bill_id)
  .then(data => {
    //  update total 
    Bill.update(Object.assign({
        check_out: dateConvert.currentDate(),
        pay_status: 1
      }, data), {
        where: {
          id: bill_id
        }
      }).then(bill => {
        if (bill) {
          res.send({
            message: "Bill was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Bill with id=${bill_id}. Maybe Bill was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || "Some error occurred while creating the Bill."
        });
      });
  })
  .catch(err => {
    res.status(500).send({
      message: `Error updating Bill with id=${id}`
    });
  });
};