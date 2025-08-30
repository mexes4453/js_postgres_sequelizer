/*>
 * ======================================================================
 * v5: Build the CRUD Rest API with node.js, postgres and sequelize
 * link: https://www.youtube.com/watch?v=AZ6y23ZIe3w&list=PLsvvBhdpMqBzyrmkAAO5zsOwO0wCTU7bj&index=5&pp=iAQB
 * 
 * This section implements the CRUD mechanism require to create, get
 * update and delete entries in a database table (model instances).
 * --------------------------------------------------------------------*/

const express = require('express');
const bodyParser = require("body-parser");
const userRoutes = require('./routes/routesUser');

const app = express();

// Middleware activation
app.use(bodyParser.json());   // Enable the use of body parser
app.use("/api", userRoutes);  // Enable the use of user routes api


// Start the server 
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
