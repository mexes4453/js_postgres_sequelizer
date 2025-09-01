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
        validata: {
            isEmail: true
        }
    }
});

/*>
 * An anonymous functions defined and called at the same time to test
 * the usage of getters, and virtual attribute */
(async ()=>
{
    await sequelize.sync();
    console.log("TEST_USER: GETTER AND VIRTUALS ")

    /*>
     * create a new user and note that the fullname is not provided because
     * it is declared as virtual in the model definition. */
    const user = await User.create({
         firstName: "Gehard",
         lastName: "Jahn",
         email:"gj@d.com"});

    /*>
     * Attempting to access the virtual attribute (fullName) triggers the call
     * to its getter function defined in the model */
    console.log( user.fullName); 
})();

module.exports = User;