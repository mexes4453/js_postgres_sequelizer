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
sequelize.sync()
.then(()=>{
    console.log("Database synchronized.");
})
.catch(err=>{
    console.error("Error synchronising the database", err);
});



// Example: create a new todo 
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