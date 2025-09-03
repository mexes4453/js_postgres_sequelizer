
const express = require('express');
const bodyParser = require("body-parser");
const userRoutes = require('./routes/routesUser');

const app = express();

// Middleware activation
app.use(bodyParser.json());   // Enable the use of body parser
app.use("/api", userRoutes);  // Enable the use of user routes api





// Test association
const { User, Profile, Todo, Student, Course } = require("./models/index");
const sequelize = require("./config/database");

(async ()=> {
    /* update all tables in database and create them if they don't exist */
    await sequelize.sync();

    /* Add rows in to tables ( create instances of models ) */ 
    const user = await User.create({ firstName: "John", lastName: 'doe', email:"jd@pg.com"});
    const profile = await Profile.create({ address: "pforzheim", sex: 'm'});
    const todo1 = await Todo.create( { action: "Do assignment", state: "pending" });
    const todo2 = await Todo.create( { action: "Take out trash", state: "done" });
    const student1 = await Student.create( { userName: "mexes"});
    const student2 = await Student.create( { userName: "gailix"});
    const course1 = await Course.create( { title: "physics"});
    const course2 = await Course.create( { title: "maths"});

    /* Enacting the relationship between the two model instances */
    await user.setProfile(profile);
    await user.addTodos( [todo1, todo2] );
    await student1.addCourse( course1 );
    await student1.addCourse( course2 );
    await student2.addCourse( course2 );

    console.log( user.fullName); 
    console.log( user.email);
    console.log( todo1.action);
    console.log( todo1.state);

    /* retreive user with associated profile */
    const userWithProfile = await User.findOne({
        where: { firstName: 'John'},
        include: Profile, // Include the associated Profile model for user
        include: Todo,    // Include the associated Todo model for user
    });
    console.log(userWithProfile.toJSON());
})()




// Start the server 
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
