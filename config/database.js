require("dotenv").config()
const appEnv = process.env;

const Sequelize = require("sequelize")


// Create a sequelize instance
const sequelize = new Sequelize({
    database: appEnv.DB_NAME,
    username: appEnv.DB_USER,
    password: appEnv.DB_PASSWORD,
    host: appEnv.DB_HOST,
    dialect: "postgres"
});

sequelize.authenticate()
.then(()=> {
    console.log( "Database connection successful.");
})
.catch( err => {
    console.error("Unable to connect to the database", err);
});

module.exports = sequelize;