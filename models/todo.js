const { DataTypes } = require("sequelize")
const sequelize = require("../config/database")

const Todo = sequelize.define("Todo", {
    action: {
        type: DataTypes.STRING,
    },
    state: {
        type: DataTypes.STRING,
    },
});

module.exports = Todo;
