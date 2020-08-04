var express = require("express");
var router = express.Router();
const {isSignedIn, isAuthenticated} = require("../controllers/auth");

const {getUserById} = require("../controllers/user");
const {
  stripePayment,
  braintreePayment,
  getToken,
} = require("../controllers/payment");

router.post("/payment/stripe", isSignedIn, isAuthenticated, stripePayment);

router.param("userId", getUserById);

router.get("/payment/gettoken/:userId", isSignedIn, isAuthenticated, getToken);

router.post(
  "/payment/braintree/:userId",
  isSignedIn,
  isAuthenticated,
  braintreePayment
);
module.exports = router;
