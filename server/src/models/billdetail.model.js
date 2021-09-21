module.exports = (sequelize, Sequelize) => {
    class BillDetail extends Sequelize.Model {}
    BillDetail.init({
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      amount: {
        type: Sequelize.DOUBLE
      }
    }, { sequelize, modelName: 'bill_details', timestamps: false, underscored: true});
    return BillDetail;
  };