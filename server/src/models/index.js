const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");

// Override timezone formatting
Sequelize.DATE.prototype._stringify = function _stringify(date, options) {
  date = this._applyTimezone(date, options);

  // Z here means current timezone, _not_ UTC
  // return date.format('YYYY-MM-DD HH:mm:ss.SSS Z');
  return date.format('DD-MM-YYYY HH:mm');
};

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    // username: dbConfig.USER,
    // password: dbConfig.PASSWORD,
    // database: dbConfig.DB,
    operatorsAliases: 0,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
    },
    // dialectOptions: {
    //   socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock"
    // },
    // define: {
    //   paranoid: true
    // }
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Account table
const Account = require("./account.model.js")(sequelize, Sequelize);

// Role table
const Role = require("./role.model.js")(sequelize, Sequelize);

// Menu table
const Menu = require("./menu.model.js")(sequelize, Sequelize);

// Food Type table
const FoodType = require("./foodtype.model.js")(sequelize, Sequelize);

// Table
const Table = require("./table.model.js")(sequelize, Sequelize);

// Bill Table
const Bill = require("./bill.model.js")(sequelize, Sequelize);

// Turn Table
const Turn = require("./turn.model.js")(sequelize, Sequelize);

// Bill Detail Table
const BillDetail = require("./billdetail.model.js")(sequelize, Sequelize);


// Relationship
Role.hasMany(Account, { as: 'accounts', foreignKey: 'role_id', constraints: false });
Account.belongsTo(Role, { foreignKey: 'role_id', as: 'role', targetKey: 'role_id', constraints: true});

FoodType.hasMany(Menu, { as: 'menus', foreignKey: 'type_id', constraints: false });
Menu.belongsTo(FoodType, { foreignKey: 'type_id', as: 'type', targetKey: 'type_id', constraints: true});

Table.hasMany(Bill, { as: 'bills', foreignKey: 'table_id', constraints: false });
Bill.belongsTo(Table, { foreignKey: 'table_id', as: 'table', targetKey: 'table_id', constraints: true});

Account.hasMany(Bill, { as: 'bills', foreignKey: 'account_id', constraints: false });
Bill.belongsTo(Account, { foreignKey: 'account_id', as: 'account', targetKey: 'id', constraints: true});

Bill.hasMany(Turn, { as: 'turns', foreignKey: 'bill_id', constraints: false });
Turn.belongsTo(Bill, { foreignKey: 'bill_id', as: 'bill', targetKey: 'id', constraints: true});

Turn.hasMany(BillDetail, { as: 'bill_details', foreignKey: 'turn_id', constraints: false });
BillDetail.belongsTo(Turn, { foreignKey: 'turn_id', as: 'turn', targetKey: 'id', constraints: true});

Menu.hasMany(BillDetail, { as: 'bill_details', foreignKey: 'menu_id', constraints: false });
BillDetail.belongsTo(Menu, { foreignKey: 'menu_id', as: 'menu', targetKey: 'id', constraints: true});

// Append table models
db.Account = Account;
db.Role = Role;
db.Menu = Menu;
db.FoodType = FoodType;
db.Table = Table;
db.Bill = Bill;
db.Turn = Turn;
db.BillDetail = BillDetail;

// Export db
module.exports = db;