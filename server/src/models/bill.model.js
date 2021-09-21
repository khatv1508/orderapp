const dateConvert = require("../helpers/dateConvert");

module.exports = (sequelize, Sequelize) => {
    class Bill extends Sequelize.Model {}
    Bill.init({
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      check_in: {
        type: Sequelize.DATE,
        get: function() {
          return dateConvert.dateTimeToString(this.getDataValue('check_in'));
        }
      },
      check_out: {
        type: Sequelize.DATE
      },
      total: {
        type: Sequelize.DOUBLE
      },
      pay_status: {
        type: Sequelize.BOOLEAN
      }
    }, { sequelize, modelName: 'bills', timestamps: false, underscored: true});
    return Bill;
  };