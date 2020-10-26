var {Order, productCart} = require("../models/order");
const order = require("../models/order");

exports.getOrderById = (req, res, next, id) => {
  Order.findById(id)
    .populate("products.product", "name price")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          error: "Can't get order",
        });
      }
      req.order = order;
      next();
    });
};

exports.createOrder = (req, res) => {
  req.body.order.user = req.profile;
  const order = new Order(req.body.order);
  order.save((err, order) => {
    if (err) {
      return res.status(400).json({
        error: "Can't save",
      });
    }

    res.json(order);
  });
};
exports.getOrder = (req, res) => {
  return res.json(req.order);
};

exports.getAllOrders = (req, res) => {
  Order.find()
    .populate("User", "_id name")
    .exec((err, orders) => {
      if (err) {
        return res.status(400).json({
          error: "No orders",
        });
      }
      return res.json(orders);
    });
};

exports.getUserOrders = (req, res) => {
  // {user: req.params.objectid}
  Order.find()
    .populate("User", "_id name")
    .where("user")
    .in(req.params.userId)

    .exec((err, orders) => {
      if (err) {
        return res.status(400).json({
          error: "No orders",
        });
      }
      return res.json(orders);
    });
};

exports.getOrderStatus = (req, res) => {
  res.json(Order.schema.path("status").enumValues);
};

exports.updateStatus = (req, res) => {
  Order.updateOne(
    // {_id: req.body.orderId},
    // {$set: {status: req.body.status}},
    {status: req.body.status},
    (err, order) => {
      if (err) {
        return res.status(400).json({
          error: "Cannot update order status",
        });
      }
      return res.json(order);
    }
  );
};
