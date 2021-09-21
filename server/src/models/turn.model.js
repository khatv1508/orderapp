module.exports = (sequelize, Sequelize) => {
    class Turn extends Sequelize.Model {}
    Turn.init({
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      num: {
        type: Sequelize.INTEGER
      },
      confirm_status: {
        type: Sequelize.BOOLEAN
      }
    }, { sequelize, modelName: 'turns', timestamps: false, underscored: true});
    return Turn;
  };