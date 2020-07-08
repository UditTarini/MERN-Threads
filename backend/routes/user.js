const express = require("express");
const router = express.Router();

const {
  getUserById,
  getUser,
  updateUser,
  purchaseList,
} = require("../controllers/user");
const {isSignedIn, isAuthenticated, isAdmin} = require("../controllers/auth");

// param
router.param("userId", getUserById);

// ---routes---

// read route
router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);

// update route
router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser);

router.put(
  "/user/orders/:userId",
  isSignedIn,
  isAuthenticated,
  updateUser,
  purchaseList
);

module.exports = router;
