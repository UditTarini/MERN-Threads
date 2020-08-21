var express = require("express");
var router = express.Router();

const {isAdmin, isSignedIn, isAuthenticated} = require("../controllers/auth");
const {getUserById, pushOrderToPurchaseList} = require("../controllers/user");
const {updateStock} = require("../controllers/product");

const {
  getOrderById,
  createOrder,
  getAllOrders,
  getOrderStatus,
  updateStatus,
  getOrder,
} = require("../controllers/order");

// params
router.param("userId", getUserById);
router.param("orderId", getOrderById);

//------------- routes ----------
// create
router.post(
  "/order/create/:userId",
  isSignedIn,
  isAuthenticated,
  pushOrderToPurchaseList,
  updateStock,
  createOrder
);

// read
router.get(
  "/order/all/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getAllOrders
);

router.get(
  "/order/status/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getOrderStatus
);
router.get(
  "/order/:orderId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getOrder
);

// update
router.put(
  "/order/:orderId/status/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateStatus
);

module.exports = router;
