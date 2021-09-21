module.exports = app => {
    const billDetail = require("../controllers/billdetail.controller.js");

    var router = require("express").Router();
  
    // Create a new Bill Detail
    router.post("/", billDetail.create);
  
    // Retrieve all Bill Detail
    router.get("/", billDetail.findAll);
  
    // Update a Bill Detail with id
    router.put("/:id", billDetail.update);
  
    app.use('/api/billdetail', router);
  };