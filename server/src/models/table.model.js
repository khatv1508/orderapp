module.exports = (sequelize, Sequelize) => {
    class Table extends Sequelize.Model {}
    Table.init({
      table_id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      table_number: {
        type: Sequelize.INTEGER
      },
    }, { sequelize, modelName: 'client_tables', timestamps: false, underscored: true });
    return Table;
  };