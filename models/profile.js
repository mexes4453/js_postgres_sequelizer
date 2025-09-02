
const {Model,  DataTypes } = require("sequelize")
const sequelize = require("../config/database")


/*
const Profile = sequelize.define("Profile", {
    action: {
        type: DataTypes.STRING,
    },
    status: {
        type: DataTypes.STRING,
    },
});
*/
/* Alternatively */

class Profile extends Model {}

Profile.init(
   {
      address: DataTypes.STRING,
      sex: DataTypes.STRING,
   },
   {
      sequelize,
      modelName: 'Profile',
   }
);



module.exports = Profile;