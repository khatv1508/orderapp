module.exports = app => {
    const turnController = require("../controllers/turn.controller.js");

    var router = require("express").Router();
  
    // Create a new Turn
    router.post("/", turnController.create);
  
    // Retrieve all Turn
    router.get("/", turnController.findAll);

    // Retrieve all Turn by id table
    router.get("/table/:id", turnController.findAllByIdTable);
  
    // Retrieve a single Turn with id
    router.get("/:id", turnController.findOne);
  
    // Update a Turn with id
    router.put("/:id", turnController.update);
  
    app.use('/api/turn', router);
  };