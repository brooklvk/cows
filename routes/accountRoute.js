const express = require("express")
const router = new express.Router() 
const utilities = require("../utilities/index")
const accountController = require("../controllers/accountController")
const baseController = require("../controllers/baseController")
// const validate = require('../utilities/account-validation')

// Route for account login 
router.get("/login", utilities.handleErrors(accountController.buildLogin));

// Route for account logout 
router.get("/logout", utilities.deleteCookie, utilities.handleErrors(baseController.buildHome))

// Route for account management 
router.get("/account-management", utilities.handleErrors(accountController.buildAccManage))

// Route for registration 
router.get("/register", utilities.handleErrors(accountController.buildRegistration))

module.exports = router;