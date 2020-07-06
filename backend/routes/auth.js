var express = require("express")
var router = express.Router()
var {
    signout,
    signup
} = require("../controllers/auth")

router.post("/signup", signup)

router.get("/signout", signout)

module.exports = router