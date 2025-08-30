const express = require("express");
const router = express.Router();
const userController = require("../controllers/controllersUser");


// Define API routes for the User resource
router.post("/Users",       userController.createUser);
router.get("/users",        userController.getUsers);
router.get("/users/:id",    userController.getUserById);
router.put("/users/:id",    userController.updateUserById);
router.delete('/users/:id', userController.deleteUserById);

module.exports = router;

