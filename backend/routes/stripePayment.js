var express = require("express");
var router = express.Router();
const {makePayment} = require("../controllers/stripePayment");

router.post("/payment", makePayment);
module.exports = router;
