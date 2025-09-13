const express = require("express");
const router = express.Router();
const userController = require("../controllers/controllersUser");


// Define API routes for the User resource
router.post("/Users",            userController.createUser);
router.get("/users",             userController.getUsers);
router.delete('/users/:id',      userController.deleteUserById);
router.post("/users/register",   userController.registerUser);
router.post("/users/login",      userController.loginUser);
router.get("/users/info",      userController.verifyToken,
	                             userController.getUserInfoById);
router.get("/users/:id",         userController.getUserById);
router.put("/users/:id",         userController.updateUserById);

module.exports = router;

