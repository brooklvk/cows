const express = require("express")
const router = new express.Router() 
const utilities = require("../utilities/index")
const cowsController = require("../controllers/cowsController")
// const validate = require('../utilities/account-validation')

// Route for view cows info 
router.get("/view", utilities.handleErrors(cowsController.buildView))

// Route for edit cows info 
router.get("/edit", utilities.handleErrors(cowsController.buildEdit))



// Process insert new cow 
router.post("/insert-cow", utilities.handleErrors(cowsController.insertCow))


module.exports = router;