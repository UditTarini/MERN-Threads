var express = require("express");
var router = express.Router();

const {isSignedIn, isAuthenticated, isAdmin} = require("../controllers/auth");
const {getUserById} = require("../controllers/user");
const {getProductById, createProduct} = require("../controllers/product");
const {check} = require("express-validator");

// params
router.param("userId", getUserById);
router.param("productId", getProductById);

// ----- routers ----

router.post(
  "/product/create/:userId",
  [
    check("name")
      .isLength({min: 3})
      .withMessage("must be at least 3 chars long"),

    check("description")
      .isLength({min: 10})
      .withMessage("must be at least 10 chars long"),

    check("photo").isEmpty().withMessage("should not be empty"),

    check("price")
      .isEmpty()
      .withMessage("should not be empty")
      .isNumeric()
      .withMessage("must be numeric"),

    check("category")
      .isLength({min: 3})
      .withMessage("must be at least 3 chars long"),

    check("stock").isEmpty().withMessage("should not be empty"),
  ],
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createProduct
);

module.exports = router;
