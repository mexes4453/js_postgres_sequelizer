const { DataTypes } = require("sequelize")
const sequelize = require("../config/database")

const Todo = sequelize.define("Todo", {
    action: {
        type: DataTypes.STRING,
    },
    status: {
        type: DataTypes.STRING,
    },
});

module.exports = Todo;