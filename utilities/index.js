const Util = {}
const jwt = require("jsonwebtoken")
require("dotenv").config()

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  let nav = "<ul>"

  nav += '<li><a href="/" title="Home">Home</a></li>'
  nav += '<li><a href="/cows">Cows</a></li>'//drop down w links to edit cow info, see cow info, etc, /cows/view /cows/edit 
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
      //  console.log(JSON.stringify(accountData))
       res.locals.loggedin = 1
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
    //  console.log(JSON.stringify(accountData))
    res.locals.loggedin = 0
    next()
  }


/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

module.exports = Util