const db = require("../models");
const { 
  Table,
  Bill,
  Turn,
  BillDetail
 } = db;
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

const parseTurn = (turns) => {
  let dataReturn = [];

  turns && turns.forEach((item) => {
    // tinh total 
    let total = 0;
    item.bill_details && item.bill_details.length > 0 && item.bill_details.forEach(detail => {
      total += detail.amount;
    });

    //  tra ve doi tuong
    dataReturn.push({
      items: item.bill_details.length,
      total: total
    })
  })

  return dataReturn;
}

const getTurnTotal = (turns) => {
  let dataReturn = 0;

  turns && turns.forEach((item) => {
    dataReturn += item.total;
  })

  return dataReturn;
}

//  
const parseData = (data) => {
  let dataReturn = [];

  data.forEach(element => {
    let tmpTurn = null;
    if (element.bills && element.bills.length > 0){
      tmpTurn = parseTurn(element.bills[0].turns);
    }
    let tempData = {
      bill_id: element.bills && element.bills.length > 0 ? element.bills[0].id : null,
      number: element.table_number,
      turns: tmpTurn,
      status: element.bills && element.bills.length > 0 ? 1 : 0 ,
      turnTotal: element.bills && element.bills.length > 0 ? getTurnTotal(tmpTurn) : 0
    }
    dataReturn.push(tempData);
  });

  return dataReturn;
}

// Retrieve all Table from the database.
exports.findAllDetail = (req, res) => {
    const pay_status = req.query.pay_status;
    var condition = pay_status 
    ? { 
      [Op.or]: [
        { pay_status: { [Op.eq]: pay_status }},
        { pay_status: { [Op.eq]: null }}
      ]
    } 
    : null;

    Table.findAll({
      order: [['table_number', 'ASC']],
      include: [{
        model: Bill,
        as: 'bills',
        required : false,
        where: condition,
        include: {
          model: Turn,
          as: 'turns',
          include: {
            model: BillDetail,
            as: 'bill_details'
          }
        }
      }]
    })
    .then(data => {
      // parse data 
      res.send(parseData(data));
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Table."
      });
    });
};

// Retrieve all Table from the database.
exports.findAll = (req, res) => {
  const table_number = req.query.table_number;
  var condition = table_number 
  ? { 
    table_number: { [Op.eq]: `%${table_number}%` }
  } 
  : null;

  Table.findAll({where: condition})
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