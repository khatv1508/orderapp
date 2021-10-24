module.exports = (sequelize, Sequelize) => {
  class FoodType extends Sequelize.Model {}
  FoodType.init({
    type_id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    type_name: {
      type: Sequelize.STRING
    },
    type_image: {
      type: Sequelize.STRING
    }
  }, { sequelize, modelName: 'food_types', timestamps: false, underscored: true });
  return FoodType;
};