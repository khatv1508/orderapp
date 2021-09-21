const dateConvert = require("../helpers/dateConvert");

module.exports = (sequelize, Sequelize) => {
    class Account extends Sequelize.Model {}
    Account.init({
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      account_name: {
        type: Sequelize.STRING
      },
      account_pass: {
        type: Sequelize.STRING
      },
      create_date: {
        type: Sequelize.DATE,
        get: function() {
          return dateConvert.dateToString(this.getDataValue('create_date'));
        }
      },
      update_date: {
        type: Sequelize.DATE,
        get: function() {
          return dateConvert.dateToString(this.getDataValue('update_date'));
        }
      },
      account_status: {
        type: Sequelize.BOOLEAN
      }
    }, { sequelize, modelName: 'accounts', timestamps: false, underscored: true});
    return Account;
  };