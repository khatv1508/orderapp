const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    username: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB,
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

// Menu table
const Menu = require("./menu.model.js")(sequelize, Sequelize);
// Food Type table
const FoodType = require("./foodtype.model.js")(sequelize, Sequelize);

// Orthers table ...

// Relationship
FoodType.hasMany(Menu, { as: 'menus', foreignKey: 'type_id', constraints: false });
Menu.belongsTo(FoodType, { foreignKey: 'type_id', as: 'type', targetKey: 'type_id', constraints: true});

// Append table models
db.Menu = Menu;
db.FoodType = FoodType;

// Export db
module.exports = db;