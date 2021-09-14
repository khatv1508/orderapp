module.exports = app => {
    const account = require("../controllers/orderapp.controller.js");

    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", account.create);
  
    // Retrieve all Tutorials
    router.get("/", account.findAll);
  
    // Retrieve all published Tutorials
    // router.get("/published", menu.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", account.findOne);
  
    // // Update a Tutorial with id
    // router.put("/:id", menu.update);
  
    // // Delete a Tutorial with id
    // router.delete("/:id", menu.delete);
  
    // // Delete all Tutorials
    // router.delete("/", menu.deleteAll);
  
    app.use('/api/menu', router);
  };