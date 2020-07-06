var express = require("express")
var router = express.Router()
const {
    check
} = require('express-validator');
var {
    signout,
    signup,
    signin
} = require("../controllers/auth")


router.post("/signup", [
    // validation
    check('name').isLength({
        min: 3
    }).withMessage('must be at least 3 chars long'),
    check('email').isEmail().withMessage('not valid'),
    check('password').isLength({
        min: 8
    }).withMessage('must be at least 8 chars long')
    .matches(/\d/).withMessage('must contain a number')
    .matches(/[A-Z]+/).withMessage('must contain a capital letter')
    .matches(/[*@!#%&()^~{}]+/).withMessage('must contain a special char')
], signup)

router.post("/signin", [
    // validation
    check('email').isEmail().withMessage('not valid'),
    check('password').isLength({
        min: 8
    }).withMessage('field is required')

], signin)


router.get("/signout", signout)

module.exports = router