require("dotenv").config()
const appEnv = process.env;

const Sequelize = require("sequelize")


// Create a sequelize instance
const sequelize = new Sequelize({
    database: appEnv.DB_NAME,
    username: appEnv.DB_USER,
    password: appEnv.DB_PASSWORD,
    host: appEnv.DB_HOST,
    dialect: "postgres",
    pool: {
        max: 5, // Maximum number of connection in the pool
        min: 1, // Maximum number of connection in the pool 

        /* Maximum time, in milliseconds that a connection can be acquired */
        acquire: 30000, 

        /* Maximum time, in milliseconds that a connection can be idle before 
        it is released */
        idle: 10000, 
    },
});

sequelize.authenticate()
.then(()=> {
    console.log( "Database connection successful.");
})
.catch( err => {
    console.error("Unable to connect to the database", err);
});

module.exports = sequelize;