const express = require("express");
const router = express.Router();
const controllerFile = require("../controllers/controllerFile");


// Define API routes for the User resource
router.post("/upload",    controllerFile.uploadFile);
router.get("/file/:id",   controllerFile.getFileById);

module.exports = router;

