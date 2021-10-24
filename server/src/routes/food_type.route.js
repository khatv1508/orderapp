module.exports = app => {
    const FoodTypeController = require("../controllers/food_type.controller.js");
    var router = require("express").Router();
  
    // Retrieve all Food Type
    router.get("/", FoodTypeController.findAll);
  
    // Retrieve all type_id 
    router.get("/:id", FoodTypeController.findOne);
  
    app.use('/api/type', router);
  };