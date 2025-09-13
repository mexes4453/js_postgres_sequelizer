/*>
 * ==================================================================
 * This section is automatically created after execution of the
 * the command "$ npx sequelize-cli init " on the terminal
 * !!! It is not need therefore it is disaabled
 * ==================================================================
'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
 * ================================================================== */


// models/index.js
const { User }= require("./user");
const Profile = require("./profile");
const Todo = require("./todo");
const Student = require("./student");
const Course = require("./course");
const File = require("./file");
const sequelize = require("../config/database");

// Define associations between models (tables) if needed
/* one-to-one : User <-> Profile */
User.hasOne(Profile) 
Profile.belongsTo(User)

/* one-to-many : User <-> Todo == See note.txt for explanation */
User.hasMany(Todo);
Todo.belongsTo(User);

/* many-to-many : Student <-> Course == See note.txt for explanation */
/*> 
 * Defining this association creates a new table (model) called 
 * "StudentCourse" with binds the two models together for referencing.
 **/
Student.belongsToMany(Course, { through: "StudentCourse" });
Course.belongsToMany(Student, { through: "StudentCourse" });


User.hasOne(Student);
Student.belongsTo(User);

// Test association

async function testDB(){
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
    await user.setStudent(student1);

    console.log( user.fullName); 
    console.log( user.email);
    console.log( todo1.action);
    console.log( todo1.state);

    /* retreive user with associated profile from database */
    const userWithProfile = await User.findOne({
        where: { firstName: 'John'},
        include: [ 
            Profile, // Include the associated Profile model for user
            Todo,    // Include the associated Todo model for user
            Student, // Include the associated Student model for user
        ]
    });
    console.log(userWithProfile.toJSON());

    /* Alternative query with more details (eager loading ) */
    const userWithAllData = await User.findByPk(1, {
        include: [
            {
                model: Profile
            },
            {
                model: Todo,
                attributes: ['action'], // specify with todo attribute to include
            },
            {
                model: Student,
                include: [
                    {
                        model: Course
                    }
                ]
            }
        ]
    });
    console.log(userWithAllData.toJSON());
};

module.exports = {
    User,
    Profile,
    Todo,
    Course,
    Student,
	File,
	sequelize,
    testDB
    // Export other models here
};
