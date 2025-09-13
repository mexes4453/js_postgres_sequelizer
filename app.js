require('dotenv').config(); // Load .env
const appEnv = process.env;
const express = require('express');
const bodyParser = require("body-parser");
const userRoutes = require('./routes/routesUser');
const fileRoutes = require('./routes/routesFile');

const app = express();

// Middleware activation
app.use(bodyParser.json());   // Enable the use of body parser
app.use("/api", userRoutes);  // Enable the use of user routes api
app.use("/"   , fileRoutes);  // Enable the use of file routes api
app.use(express.json());


// Routes for application 

// Start the server 
const port = appEnv.SERVER_PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
