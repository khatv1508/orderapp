module.exports = app => {
    const accountController = require("../controllers/account.controller.js");

    var router = require("express").Router();
  
    // Create a new Account
    router.post("/", accountController.create);
  
    // Retrieve all Account
    router.get("/", accountController.findAll);
  
    // Retrieve a single Account with id
    router.get("/:id", accountController.findOne);
  
    // Update a Account with id
    router.put("/:id", accountController.update);
  
    // Delete a Account with id
    router.delete("/:id", accountController.delete);

    // Reset password Account with id
    router.put("/pass/:id", accountController.resetPass);

    // Check old password Account with id
    router.post("/pass/:id", accountController.checkPass);
  
    app.use('/api/account', router);
  };