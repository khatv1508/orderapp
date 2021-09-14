module.exports = (sequelize, Sequelize) => {
  const Model = Sequelize.Model;

  class Menu extends Model {}
  Menu.init({
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    type_id: {
      type: Sequelize.INTEGER
    },
    food_name: {
      type: Sequelize.STRING
    },
    price: {
      type: Sequelize.DOUBLE
    },
    image: {
      type: Sequelize.STRING
    }
  }, { sequelize, modelName: 'menus', timestamps: false });
  return Menu;
};