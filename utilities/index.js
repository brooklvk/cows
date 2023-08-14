const Util = {}
const jwt = require("jsonwebtoken")
require("dotenv").config()

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
    let nav = "<ul>"

    nav += '<li><a href="/" title="Home">Home</a></li>'
    nav += '<li id="cows-li"><a href="/">Cows</a><div id="cows-div"><a href="/cows/view">View cows info</a><a href="/cows/edit">Edit cows info</a></div></li>'
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

  let viewInfo = `<p>${cowsData.cowTable[0].cow_id}</p>`

  return viewInfo 
}

Util.createEdit = (req, res, next) => {

  let editInfo = '<div>'

  editInfo += `<p>Cow ID: ${cowsData.cowTable[0].cow_id}</p>`
  editInfo += `<p>Cow Tag: ${cowsData.cowTable[0].cow_tag_current}</p>`
  editInfo += `<p>Color: ${cowsData.cowTable[0].color}</p>`
  editInfo += `<p>Physical Description: ${cowsData.cowTable[0].phys_description}</p>`
  editInfo += `<p>Breed: ${cowsData.cowTable[0].breed}</p>`
  editInfo += `<p>Notes: ${cowsData.cowTable[0].notes}</p>`
  editInfo += `<p>Bulling: ${cowsData.cowTable[0].bulling}</p>`
  let branding = cowsData.cowTable[0].branding_date
  branding.toLocaleTimeString()
  editInfo += `<p>Branding Date: ${branding}</p>`
  editInfo += `<p>Birth Year: ${cowsData.cowTable[0].birth_year}</p>`

  editInfo += '</div>'

  return editInfo 
}

/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = func => (req, res, next) => Promise.resolve(func(req, res, next)).catch(next)

module.exports = Util