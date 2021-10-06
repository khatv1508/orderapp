const db = require("../models");
const { Menu } = db;
const Op = db.Sequelize.Op;

// Create and Save a new Menu
exports.create = (req, res) => {
  // Validate request
  if (!req.body.type_id) {
    res.status(400).send({
      message: "Type id can not be empty!"
    });
    return;
  }
  if (!req.body.food_name) {
    res.status(400).send({
      message: "Food name can not be empty!"
    });
    return;
  }
  if (!req.body.price) {
    res.status(400).send({
      message: "Price can not be empty!"
    });
    return;
  }

  // Create a Menu
  const menu = {
    type_id: req.body.type_id,
    food_name: req.body.food_name,
    price: req.body.price,
    image: req.body.image
  };

  // Save Menu in the database
  Menu.create(menu)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the menu."
      });
    });
};

const getPagination = (page, size) => {
  const limit = size ? +size : 4;
  const offset = page ? ((+page - 1) * limit) : 0;

  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: menus } = data;
  const currentPage = page ? +page : 1;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, menus, totalPages, currentPage };
};

// Retrieve all Menu from the database.
exports.findAll = (req, res) => {
    const { page, size, food_name } = req.query;
    var condition = food_name 
    ? { food_name: { [Op.like]: `%${food_name}%` } } 
    : null;

    const { limit, offset } = getPagination(page, size);

    Menu.findAndCountAll({ 
      where: condition, 
      limit, 
      offset,
      include: ["type"]
    })
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving menu."
      });
    });
};

// Find a single Menu with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Menu.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: `Error retrieving Menu with id=${id}`
      });
    });
};

// Update a Menu by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Menu.update(req.body, {
    where: { id: id }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: "Menu was updated successfully."
      });
    } else {
      res.send({
        message: `Cannot update Menu with id=${id}. Maybe Menu was not found or req.body is empty!`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: `Could not delete Menu with id=${id}`
    });
  });
};

// Delete a Menu with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Menu.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Menu was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Menu with id=${id}. Maybe Menu was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Could not delete Menu with id=${id}`
      });
    });
};

// Find all type_id menu
exports.findAllByType = (req, res) => {
  const type_id = req.params.type_id;

  Menu.findAll({ where: {type_id: type_id}})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Menu."
      });
    });
};

// Update image of Menu by the id in the request
exports.updateImage = (req, res) => {
  const id = req.params.id;

  Menu.update(req.body, {
    where: { id: id }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: "Menu was updated successfully."
      });
    } else {
      res.send({
        message: `Cannot update Menu with id=${id}. Maybe Menu was not found or req.body is empty!`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: `Could not delete Menu with id=${id}`
    });
  });
};