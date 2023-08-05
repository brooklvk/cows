const express = require("express")
const router = new express.Router() 
const utilities = require("../utilities/index")
const accountController = require("../controllers/accountController")
const baseController = require("../controllers/baseController")
// const validate = require('../utilities/account-validation')

// Route for account login 
router.get("/login", utilities.handleErrors(accountController.buildLogin));

// Route for registration 
router.get("/register", utilities.handleErrors(accountController.buildRegistration))

// Route for account logout 
router.get("/logout", utilities.deleteCookie, utilities.handleErrors(baseController.buildHome))

// Route for account management 
router.get("/account-management", utilities.handleErrors(accountController.buildAccManage))

// Route for account updates 
router.get("/account-update", utilities.handleErrors(accountController.buildAccUpdate))




// Process the login request
router.post(
    "/login",
    // validate.loginRules(),
    // validate.checkLoginData,
    utilities.handleErrors(accountController.accountLogin)
)
  
// Process the registration data
router.post(
    "/register",
    // validate.registrationRules(),
    // validate.checkRegData,
    utilities.handleErrors(accountController.accountRegistration)
)
  
// Process the update (name/email)
// router.post(
//     "/update-account",
    // validate.updateAccountRules(),
    // validate.checkAccountData,
//     utilities.handleErrors(accountController.updateAccount)
// )
  
// Process change password 
// router.post(
//     "/update-password",
    // validate.changePasswordRules(),
    // validate.checkPasswordData,
//     utilities.handleErrors(accountController.changePassword)  
// )

module.exports = router;