const utilities = require("../utilities/index")
const cowsModel = require("../models/cowsModel")

/* ****************************************
*  Deliver view cows info view
* *************************************** */
async function buildView(req, res, next) {
    const nav = await utilities.getNav()

    const cowTable = await cowsModel.getCowTable()
    const calfTable = await cowsModel.getCalfTable()
    const bullTable = await cowsModel.getBullTable()
    const deathTable = await cowsModel.getDeathTable()
    const saleTable = await cowsModel.getSaleTable()
    const vetTable = await cowsModel.getVetTable()
    const shotsTable = await cowsModel.getShotsTable()
    const cowShotsTable = await cowsModel.getCowShotsTable()
    const calfShotsTable = await cowsModel.getCalfShotsTable()

    cowsData = { cowTable, calfTable, bullTable, deathTable, saleTable, vetTable, shotsTable, cowShotsTable, calfShotsTable }
    
    res.locals.cowsData = cowsData 
    const viewInfo = utilities.createView()

    res.render("cows/view", {
      title: "View Info",
      nav,
      viewInfo,
      errors: null,
    })
}

/* ****************************************
*  Deliver edit cows info view
* *************************************** */
async function buildEdit(req, res, next) {
    const nav = await utilities.getNav()

    const cowTable = await cowsModel.getCowTable()
    const calfTable = await cowsModel.getCalfTable()
    const bullTable = await cowsModel.getBullTable()
    const deathTable = await cowsModel.getDeathTable()
    const saleTable = await cowsModel.getSaleTable()
    const vetTable = await cowsModel.getVetTable()
    const shotsTable = await cowsModel.getShotsTable()
    const cowShotsTable = await cowsModel.getCowShotsTable()
    const calfShotsTable = await cowsModel.getCalfShotsTable()

    cowsData = { cowTable, calfTable, bullTable, deathTable, saleTable, vetTable, shotsTable, cowShotsTable, calfShotsTable }

    res.locals.cowsData = cowsData
    const editInfo = utilities.createEdit()

    res.render("cows/edit", {
      title: "Edit Info",
      nav,
      editInfo,
      errors: null,
    })
}

/* ****************************************
*  Deliver add new info view
* *************************************** */
async function buildAdd(req, res, next) {
    const nav = await utilities.getNav()

    const cowTable = await cowsModel.getCowTable()
    const calfTable = await cowsModel.getCalfTable()
    const bullTable = await cowsModel.getBullTable()
    const deathTable = await cowsModel.getDeathTable()
    const saleTable = await cowsModel.getSaleTable()
    const vetTable = await cowsModel.getVetTable()
    const shotsTable = await cowsModel.getShotsTable()
    const cowShotsTable = await cowsModel.getCowShotsTable()
    const calfShotsTable = await cowsModel.getCalfShotsTable()

    cowsData = { cowTable, calfTable, bullTable, deathTable, saleTable, vetTable, shotsTable, cowShotsTable, calfShotsTable }

    res.locals.cowsData = cowsData 
    const addInfo = utilities.createAdd()

    res.render("cows/add", {
      title: "Add New Info",
      nav,
      addInfo,
      errors: null,
    })
}

// Insert new cow to db 
async function addCow(req, res, next) {
    // make insert any animal? if cow, if calf etc? 

    // get list of info from res/req and set variables 

    // const cow_tag_current 
    // const color 
    // const phys_description 
    // const breed 
    // const notes 
    // const branding_date 
    // const birth_year 

    const result = cowsModel.insertCow(cow_tag_current, color, phys_description, breed, notes, branding_date, birth_year) 
}

module.exports = { buildView, buildEdit, buildAdd, addCow }