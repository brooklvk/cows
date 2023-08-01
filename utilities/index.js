const Util = {}
const jwt = require("jsonwebtoken")
require("dotenv").config()

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  let list = "<ul>"

  list += '<li><a href="/#home" title="Home">Home</a></li>'
  list += '<li><a href="/">Cows</a></li>'
  list += '<li><a href="/">Employees</a></li>'
  list += '<li><a href="/">Handbooks</a></li>'
  list += '<li><a href="/">Resources</a></li>'
  list += '<li><a href="/">Taxes</a></li>'

  list += "</ul>"
  return list
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