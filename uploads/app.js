require('dotenv').config(); // Load .env
const appEnv = process.env;
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require("body-parser");
const userRoutes = require('./routes/routesUser');
const fileRoutes = require('./routes/routesFile');
const pg = require("pg");


const app = express();

// Middleware activation
app.use(bodyParser.json());   // Enable the use of body parser
app.use("/api", userRoutes);  // Enable the use of user routes api
app.use("/"   , fileRoutes);  // Enable the use of file routes api
app.use(express.json());


// create a postgres db connection instance.
const pool = new pg.Pool({
    user: appEnv.DB_USER,
    password: appEnv.DB_PASSWORD,
    host: appEnv.DB_HOST,
    port: appEnv.DB_PORT,
    database: appEnv.DB_NAME,
});


// Routes for application 
// user registration 
app.post("/register", async(req, res) => {
    console.log("== [ post::register ] == ");
    try
    {
        console.log("== [ post::register ] == ", req.body);
        const { userName, email, password } = req.body;
        console.log("== [ post::register ] == ",userName);
        console.log("== [ post::register ] == ",email);
        console.log("== [ post::register ] == ",password);
        const hashedPw = await bcrypt.hash(password, 10);
        console.log("== [ post::register ] == ","hashedPw -> ", hashedPw);

        const result = await pool.query(
            /*>
             * Note that the database table fields are case sensitive, hence, such table fields 
             * are wrapped around double quotes */
            `INSERT INTO public."Users" ("userName", email, password, "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [ userName, email, hashedPw, new Date(), new Date() ]
        );
        res.status(201).json(result.rows[0]);
    }
    catch( error )
    {
        console.error( error.message);
        res.status(500).send("Server Error");
    }
})




// user login
app.post("/login", async (req, res) => {
    console.log("== [ post::login ] == ");
    try
    {
        console.log("== [ post::login ] == ", req.body);
        const {email, password} = req.body;
        const result = await pool.query(
            `SELECT * FROM public."Users" WHERE email = $1`, [email]
        );

        const user = result.rows[0];
        console.log("== [ post::login ] == ", "user -> ", user);
        if (!user)
        {
            return res.status(400).json({ message: "Invalid Credentials"});
        }

        const isPwMatch = await bcrypt.compare(password, user.password)
        if (!isPwMatch)
        {
            return res.status(400).json({ message: "Invalid Credentials"});
        }

        const token = jwt.sign( { userId: user.id },    // payload
                                appEnv.SECRET_KEY,   // secret key
                                {expiresIn:"1h"});      // options
        res.json({ token });
        console.log("== [ post::login ] == ", "token -> ", token);
    }                           
    catch (error)
    {
        console.error (error.message);
        res.status(500).send("Server Error")
    }
})



// Protected route to get user info
// Middleware function for token verification
function verifyToken( req, res, next)
{
    console.log("== [ verifyToken ] ==> ", req.headers.authorization);
    const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
    if (!token)
    {
        return res.status(401).json({ message: "Missing token"});
    }

    try
    {
        const decoded = jwt.verify(token, appEnv.SECRET_KEY);
        req.user = decoded;
        console.log("== [ verifyToken ] ==> ", decoded);
        next();
    }
    catch (error)
    {
        console.error( "Token verification failed:", error.message);
        res.status(401).json( { message: "Invalid token"});
    }
}


// Protected Route for user information
app.get("/userinfo", verifyToken, (req, res) => {
    console.log("== [ get::userinfo ] == ");
    res.json({user: req.user });
})






// Start the server 
const port = appEnv.SERVER_PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
