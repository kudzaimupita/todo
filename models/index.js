const config = require("../config/config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.postgres.DB,
  config.postgres.USER,
  config.postgres.PASSWORD,
  {
    host: config.postgres.HOST,
    dialect: config.postgres.DIALECT,
    operatorsAliases: false,

    pool: {
      max: config.postgres.pool.max,
      min: config.postgres.pool.min,
      acquire: config.postgres.pool.acquire,
      idle: config.postgres.pool.idle,
    },
  }
);

const db = {};

db.Sequelize = Sequelize;
db.connection = sequelize;

db.users = require("./user.model.js")(db.connection, db.Sequelize);
db.tasks = require("./task.model.js")(db.connection, db.Sequelize);

module.exports = db;
