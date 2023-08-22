const Util = {}
const jwt = require("jsonwebtoken")
require("dotenv").config()

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
    let nav = "<ul>"

    nav += '<li><a href="/" title="Home">Home</a></li>'
    nav += '<li id="cows-li"><a href="/">Cows</a><div id="cows-div"><a href="/cows/view">View cows info</a><a href="/cows/edit">Edit cows info</a><a href="/cows/add">Add new info</a></div></li>'
    nav += '<li><a href="/employee">Employees</a></li>'//drop down w links to view, edit 
    nav += '<li><a href="/management/handbooks">Handbooks</a></li>'
    nav += '<li><a href="/management/resources">Resources</a></li>'
    nav += '<li><a href="/management/taxes">Taxes</a></li>'

    nav += "</ul>"
    return nav
}

/* ****************************************
* Middleware to check token validity
**************************************** */
Util.checkJWTToken = (req, res, next) => {
    if (req.cookies.jwt) {
     jwt.verify(
      req.cookies.jwt,
      process.env.ACCESS_TOKEN_SECRET,
      function (err, accountData) {
       if (err) {
        req.flash("Please log in")
        res.clearCookie("jwt")
        return res.redirect("/account/login")
       }
       res.locals.accountData = accountData
       res.locals.loggedIn = 1
       next()
      })
    } else {
     next()
    }
}
  
/* ****************************************
* Delete token on logout and also on update account 
**************************************** */
Util.deleteCookie = (req, res, next) => {
    if (req.cookies.jwt) {
      res.clearCookie("jwt")
      return res.redirect("/")
    }
    res.locals.accountData = null 
    res.locals.loggedIn = 0
    next()
}

Util.createView = (req, res, next) => {

  let viewInfo = ''

    viewInfo += '<div class="cows">'

    cowsData.cowTable.forEach(cow => {
        viewInfo += '<div class="cow">'
      
        viewInfo += '<form action="/cows/view" method="get">'

        viewInfo += `<h2>Cow</h2>`

        viewInfo += '<fieldset>'
          viewInfo += '<legend>Required Information</legend>'
          viewInfo += `<label>Cow ID: <input type="text" name="cow_id" value="${cow.cow_id}" readonly></label>`
          viewInfo += `<label>Cow Tag: <input type="text" name="cow_tag_current" value="${cow.cow_tag_current}" readonly></label>`
          viewInfo += `<label>Birth Year: <input type="number" name="birth_year" value="${cow.birth_year}" readonly></label>`
          viewInfo += `<label>Color: <input type="text" name="color" value="${cow.color}" readonly></label>`
        viewInfo += '</fieldset>'

        viewInfo += '<fieldset>'
          viewInfo += '<legend>Additional Information</legend>'
          viewInfo += `<label>Breed: <input type="text" name="breed" value="${cow.breed}" readonly></label>`
          viewInfo += `<label>Physical Description: <br><textarea name="phys_description" cols="30" rows="10" readonly>${cow.phys_description}</textarea></label>`
          viewInfo += `<label>Notes: <br><textarea name="notes" cols="30" rows="10" readonly>${cow.notes}</textarea></label>`
          let branding = `${cow.date}`
          branding = branding.split(" ")
          viewInfo += `<label>Branding Date: <input type="text" name="branding_date" value="${branding[0]} ${branding[1]} ${branding[2]} ${branding[3]}" readonly></label>`
          viewInfo += `<label>Mother Cow's ID: <input type="number" name="mother_cow_id" value="${cow.mother_cow_id}" readonly></label>`
          viewInfo += `<label>This Cow's Calf ID: <input type="number" name="cow_was_calf" value="${cow.cow_was_calf}" readonly></label>`
        viewInfo += '</fieldset>'

        viewInfo += '</form>'

        viewInfo += '</div>'
    })

    viewInfo += '</div>'

  return viewInfo 
}

Util.createEdit = (req, res, next) => {

    let editInfo = ''

    editInfo += '<div class="cows">'

    cowsData.cowTable.forEach(cow => {
        editInfo += '<div class="cow">'
      
        editInfo += '<form action="/cows/edit-cow" method="post">'

        editInfo += `<h2>Cow</h2>`

        editInfo += '<fieldset>'
          editInfo += '<legend>Required Information</legend>'
          editInfo += `<label>Cow ID: <input type="text" name="cow_id" value="${cow.cow_id}" readonly></label>`
          editInfo += `<label>Cow Tag: <input type="text" name="cow_tag_current" value="${cow.cow_tag_current}" required></label>`
          editInfo += `<label>Birth Year: <input type="number" name="birth_year" value="${cow.birth_year}" required></label>`
          editInfo += `<label>Color: <input type="text" name="color" value="${cow.color}" required></label>`
        editInfo += '</fieldset>'

        editInfo += '<fieldset>'
          editInfo += '<legend>Additional Information</legend>'
          editInfo += `<label>Breed: <input type="text" name="breed" value="${cow.breed}"></label>`
          editInfo += `<label>Physical Description: <br><textarea name="phys_description" cols="30" rows="10">${cow.phys_description}</textarea></label>`
          editInfo += `<label>Notes: <br><textarea name="notes" cols="30" rows="10">${cow.notes}</textarea></label>`
          let branding = `${cow.date}`
          branding = branding.split(" ")
          editInfo += `<label>Branding Date: <input type="text" name="branding_date" value="${branding[0]} ${branding[1]} ${branding[2]} ${branding[3]}"></label>`
          editInfo += `<label>Mother Cow's ID: <input type="number" name="mother_cow_id" value="${cow.mother_cow_id}"></label>`
          editInfo += `<label>This Cow's Calf ID: <input type="number" name="cow_was_calf" value="${cow.cow_was_calf}"></label>`
        editInfo += '</fieldset>'

        editInfo += '<fieldset>'
        editInfo += '<button type="submit">SUBMIT CHANGES</button>'
        editInfo += '</fieldset>'

        editInfo += '</form>'

        editInfo += '</div>'
    })

    editInfo += '</div>'

  return editInfo 
}

Util.createAdd = (req, res, next) => {

  let addInfo = ''

  addInfo += '<div class="cows">'
  addInfo += '<div class="cow">'

  addInfo += '<form action="/cows/add-cow" method="post">'

  addInfo += `<h2>Cow</h2>`

  addInfo += '<fieldset>'
    addInfo += '<legend>Required Information</legend>'
    addInfo += `<label>Cow Tag: <input type="text" name="cow_tag_current" required></label>`
    addInfo += `<label>Birth Year: <input type="number" name="birth_year" required></label>`
    addInfo += `<label>Color: <input type="text" name="color" required></label>`
  addInfo += '</fieldset>'

  addInfo += '<fieldset>'
    addInfo += '<legend>Additional Information</legend>'
    addInfo += `<label>Breed: <input type="text" name="breed"></label>`
    addInfo += `<label>Physical Description: <br><textarea name="phys_description" cols="30" rows="10"></textarea></label>`
    addInfo += `<label>Notes: <br><textarea name="notes" cols="30" rows="10"></textarea></label>`
    addInfo += `<label>Branding Date: <input type="text" name="branding_date"></label>`// yyyy-mm-dd 
    addInfo += `<label>Mother Cow's ID: <input type="number" name="mother_cow_id"></label>`
    addInfo += `<label>This Cow's Calf ID: <input type="number" name="cow_was_calf"></label>`
  addInfo += '</fieldset>'

  addInfo += '<fieldset>'
    addInfo += '<button type="submit">ADD NEW INFORMATION</button>'
  addInfo += '</fieldset>'

  addInfo += '</form>'

  addInfo += '</div>'
  addInfo += '</div>'

  return addInfo 
}

/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = func => (req, res, next) => Promise.resolve(func(req, res, next)).catch(next)

module.exports = Util