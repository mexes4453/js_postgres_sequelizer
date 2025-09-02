/*>
 * ==================================================================
 * This section is automatically created after execution of the
 * the command "$ npx sequelize-cli init " on the terminal
 * !!! It is not need therefore it is disaabled
 * ==================================================================
'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
 * ================================================================== */


// models/index.js
const User = require("./user");
const Todo = require("./todo");
const Profile = require("./profile");

// Define associations between models (tables) if needed
/* one-to-one : User <-> Profile */
User.hasOne(Profile) 
Profile.belongsTo(User)

/* one-to-many : User <-> Todo */
User.hasMany(Todo);
Todo.belongsTo(User);


module.exports = {
    User,
    Profile,
    Todo
    // Export other models here
};