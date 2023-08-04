const utilities = require("../utilities/index")
const accountModel = require("../models/accountModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("dotenv").config()

/* ****************************************
*  Deliver login view
* *************************************** */
async function buildLogin(req, res, next) {
    let nav = await utilities.getNav()
    res.render("account/login", {
      title: "Login",
      nav,
      errors: null,
    })
}

/* ****************************************
 *  Process login request
 * ************************************ */
async function accountLogin(req, res) {
    let nav = await utilities.getNav()

    const { account_email, account_password } = req.body
    const accountData = await accountModel.getAccountByEmail(account_email)
    if (!accountData) {
     req.flash("notice", "Please check your credentials and try again.")
     res.status(400).render("account/login", {
      title: "Login",
      nav,
      errors: null,
      account_email,
     })
    return
    }
    try {
     if (await bcrypt.compare(account_password, accountData.account_password)) {
     delete accountData.account_password
     const accessToken = jwt.sign(accountData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 3600 * 1000 })
     res.cookie("jwt", accessToken, { httpOnly: true, maxAge: 3600 * 1000 })
     return res.redirect("/account/account-management")
     }
    } catch (error) {
      return new Error("Access Forbidden")
    }
}

// Deliver registration view 
async function buildRegistration(req, res) {
    let nav = await utilities.getNav()

    res.render("account/register", {
        title: "Registration",
        nav,
        errors: null,
    })
}

// Process registration request 
async function accountRegistration(req, res) {
    let nav = await utilities.getNav()

    const { account_firstname, account_lastname, account_email, account_password } = req.body

    let hashedPassword
    try {
       hashedPassword = await bcrypt.hashSync(account_password, 10)
    } catch (error) {
        req.flash("notice", "Sorry, there was an error processing the registration.")
        res.status(500).render("account/register", {
        title: "Registration",
        nav,
        errors: null,
        })
    }
  
    const regResult = await accountModel.registerAccount(
        account_firstname,
        account_lastname,
        account_email,
        hashedPassword
    )
  
    if (regResult) {
      req.flash("notice", `Congratulations, you\'re registered ${account_firstname}. Please log in.`)
      res.status(201).render("account/login", {
        title: "Login",
        nav,
        errors: null,
      })
    } else {
      req.flash("notice", "Sorry, the registration failed.")
      res.status(501).render("account/register", {
        title: "Registration",
        nav,
        errors: null,
      })
    }
}

// Deliver manage account view - upon login 
// async function buildAccManage(req, res) {
//     let nav = await utilities.getNav()

//     res.render("account/account-management", {
//         title: "Manage Account",
//         nav,
//         errors: null,
//     })
// }

module.exports = { buildLogin, accountLogin, buildRegistration, accountRegistration }