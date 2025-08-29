/*>
 * Moved to config/database.js */
//require("dotenv").config()
//const appEnv = process.env;

/*>
 * Moved to config/database.js */
//const Sequelize = require("sequelize")


/*>
 * Moved to config/database.js */
// Create a sequelize instance
/*
const sequelize = new Sequelize({
    database: appEnv.DB_NAME,
    username: appEnv.DB_USER,
    password: appEnv.DB_PASSWORD,
    host: appEnv.DB_HOST,
    dialect: "postgres"
});
*/


/*>
 * Moved to config/database.js */
// Test the database connection
/*
sequelize.authenticate()
.then(()=> {
    console.log( "Database connection successful.");
})
.catch( err => {
    console.error("Unable to connect to the database", err);
});
*/


// Define a model (e.g user) - a Table in database 
// This can be moved to a seperate file.: ./models/todo.js
/* 
const Todo = sequelize.define("Todo", {
    action: {
        type: Sequelize.STRING,
    },
    status: {
        type: Sequelize.STRING,
    },
});
*/

// Synchronise the model with the database


// Example: create a new todo 
/*>
Todo.create({
    action: "Programming",
    status: "ongoing"
})
.then ( todo=> {
    console.log("Todo created:", todo.toJSON());
})
.catch ( err => {
    console.error("Error creating todo", err);
})
*/


/*>
 * ======================================================================
 * The above section is the first base code that demonstrates the use of
 * sequelize with postgres. This matches the app.js from the videos 1 & 3
 * in the series.
 * Simply uncomment them all to reuse and done in the videos ( 1 , 3 )
 * The rest of the tutorial will be snapshoted using git tags.
 * --------------------------------------------------------------------*/

const { User, Post } = require("./models");
const sequelize = require("./config/database");

/*>
 * Synchronise all defined models with the database and also create tables
 * (models) if they do not exist */
sequelize.sync()
.then(()=>{
    console.log("Database synchronized.");
})
.catch(err=>{
    console.error("Error synchronising the database", err);
});
