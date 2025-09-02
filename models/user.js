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
    },
    /*
    birthdate:{ // Used to demonstrate virtuals 
        type: DataTypes.DATE
    }*/

},
{
    sequelize,
    modelName: "User"
});
/*
User.prototype.getAge = function(){
    const birthdate = this.getDataValue("birthdate");
    if (!birthdate) return null;

    const today = new Date();
    const age = today.getFullYear - birthdate.getFullYear();
    return age;
}
*/

module.exports = User;
