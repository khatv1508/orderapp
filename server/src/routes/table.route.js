module.exports = app => {
    const tableController = require("../controllers/table.controller.js");

    var router = require("express").Router();
  
    // Create a new Table
    router.post("/", tableController.create);
  
    // Retrieve all Table
    router.get("/", tableController.findAll);
  
    // Delete a Table with id
    router.delete("/:id", tableController.delete);
  
    app.use('/api/table', router);
  };