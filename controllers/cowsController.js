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

async function editCow(req, res, next) {
    const nav = await utilities.getNav()

    let { cow_id, cow_tag_current, birth_year, color, phys_description, breed, notes, branding_date, mother_cow_id, cow_was_calf } = req.body
    if (!phys_description) {phys_description = null}
    if (!breed) {breed = null}
    if (!notes) {notes = null}
    if (!branding_date) {branding_date = null}
    if (!mother_cow_id) {mother_cow_id = null}
    if (!cow_was_calf) {cow_was_calf = null}

    const editResult = await cowsModel.editCow(cow_id, cow_tag_current, birth_year, color, phys_description, breed, notes, branding_date, mother_cow_id, cow_was_calf)

    if (editResult) {
        req.flash("notice", `ID #${cow_id} was successfully updated.`)
        res.redirect("/cows/edit")
    } else {
        req.flash("notice", "Sorry, the update failed.")
        res.status(501).render("/cows/edit", {
            title: "Edit Info",
            nav,
            errors: null,
            cow_id, cow_tag_current, birth_year, color, phys_description, breed, notes, branding_date, mother_cow_id, cow_was_calf
        })
    }
}

// Insert new cow to db 
async function addCow(req, res, next) {
    const nav = await utilities.getNav()

    let { cow_tag_current, birth_year, color, phys_description, breed, notes, branding_date, mother_cow_id, cow_was_calf } = req.body

    if (!phys_description) {phys_description = null}
    if (!breed) {breed = null}
    if (!notes) {notes = null}
    if (!branding_date) {branding_date = null}
    if (!mother_cow_id) {mother_cow_id = null}
    if (!cow_was_calf) {cow_was_calf = null}

    console.log(cow_tag_current, birth_year, color, phys_description, breed, notes, branding_date, mother_cow_id, cow_was_calf)

    const addResult = await cowsModel.insertCow(cow_tag_current, birth_year, color, phys_description, breed, notes, branding_date, mother_cow_id, cow_was_calf) 
    console.log(addResult)
    if (addResult) {
        req.flash("notice", `ID #${addResult.cow_id} was successfully added.`)
        res.redirect("/cows/add")
    } else {
        req.flash("notice", "Sorry, the add failed.")
        res.status(501).render("/cows/add", {
            title: "Add New Info",
            nav,
            errors: null,
            cow_id, cow_tag_current, birth_year, color, phys_description, breed, notes, branding_date, mother_cow_id, cow_was_calf
        })
    }
}

module.exports = { buildView, buildEdit, buildAdd, editCow, addCow }