module.exports = app => {
    const billController = require("../controllers/bill.controller.js");

    var router = require("express").Router();
  
    // Order a new Bill
    router.post("/order", billController.order);
  
    // Retrieve all Bill
    router.get("/", billController.findAll);
  
    // Retrieve a single Bill with id
    router.get("/:id", billController.findOne);
  
    // Update a Bill with id
    router.put("/paybill/:id", billController.payBill);
  
    app.use('/api/bill', router);
  };