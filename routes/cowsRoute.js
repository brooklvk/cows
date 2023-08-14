const express = require("express")
const router = new express.Router() 
const utilities = require("../utilities/index")
const cowsController = require("../controllers/cowsController")
// const validate = require('../utilities/account-validation')

// Route for view cows info 
router.get("/view", utilities.handleErrors(cowsController.buildView))

// Route for edit cows info 
router.get("/edit", utilities.handleErrors(cowsController.buildEdit))

// Route for add new info 
router.get("/add", utilities.handleErrors(cowsController.buildAdd))



// Process edit a cow's info 
router.post("/edit-cow", utilities.handleErrors(cowsController.editCow))

// Process insert new cow 
router.post("/add-cow", utilities.handleErrors(cowsController.addCow))


module.exports = router;