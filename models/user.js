const { DataTypes } = require("sequelize")
const sequelize = require("../config/database")

const User = sequelize.define("User", {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fullName: {
        type:DataTypes.VIRTUAL,  // declare a virtual attribute
        get(){
            const firstName = this.getDataValue('firstName')
            const lastName = this.getDataValue('lastName')
            return (`${firstName} - ${lastName}`)
        }
    },
    email: {
        type: DataTypes.STRING,
        unique:true,
        allowNull: false,
        validate: {
            isEmail: true
        },
        set(value){
            this.setDataValue("email", value.toLowerCase());
        }
    }
});



/*>
 * An anonymous functions defined and called at the same time to test
 * the usage of getters, setter and virtual attribute */
(async ()=>
{
    console.log("TEST (models/user.js) :: GETTER, VIRTUALS, SETTER")
    await sequelize.sync();

    /*>
     * create a new user and note that the fullname is not provided because
     * it is declared as virtual in the model definition. */
    const user = await User.create({
         firstName: "Gehard",
         lastName: "Jahn",
         email:"Gerhard.Jahn@d.com"});

    /*>
     * Attempting to access the virtual attribute (fullName) triggers the call
     * to its getter function defined in the model */
    console.log( user.fullName); 

    /* The email setter will convert the all characters in the email to lower
     * case before setting it in the database.
     * Therefore, when the email attribute is accessed. it will print the 
     * email is lowercase eventhough user provide email that contains upper
     * case characters.*/
    console.log( user.email);
})();

module.exports = User;
