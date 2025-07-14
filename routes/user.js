//[SECTION] Dependencies and Modules
const express = require('express');
const userController = require('../controllers/user.js')

const { verify } = require('../auth.js')

//[SECTION] Routing Component
const router = express.Router();


//[SECTION] Route for User Registration
router.post("/register", userController.registerUser);

//[SECTION] Route for User Login
router.post("/login", userController.loginUser);


//[Section] Route for Retrieving User Details
router.get("/details", verify, userController.getProfile);

module.exports = router