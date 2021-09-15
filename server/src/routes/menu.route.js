module.exports = app => {
  const menuController = require("../controllers/menu.controller.js");
  var router = require("express").Router();

  // Create a new Menu
  router.post("/", menuController.create);

  // Retrieve all Menu
  router.get("/", menuController.findAll);

  // Retrieve a single Menu with id
  router.get("/:id", menuController.findOne);

  // // Update a Menu with id
  router.put("/:id", menuController.update);

  // // Delete a Menu with id
  router.delete("/:id", menuController.delete);

  // Retrieve all type_id Menu
  router.get("/type/:type_id", menuController.findAllByType);

  app.use('/api/menu', router);
};