var {Order, productCart} = require("../models/order");
const order = require("../models/order");

exports.getOrderById = (req, res, id, next) => {
  Order.findById(id)
    .populate("products.product", "name price")
    .exec((err, res) => {
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
  console.log("ORDER IN");
  req.body.order.user = req.profile;
  const order = new Order(req.body.order);
  order.save((err, order) => {
    if (err) {
      console.log("ORDER IN", err);
      return res.status(400).json({
        error: "Can't save",
      });
    }
    console.log("ORDER", order);
    res.json(order);
  });
};

exports.getAllOrders = (req, res) => {
  Order.find()
    .populate("user", "_id name")
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
  Order.update(
    {_id: req.body.orderId},
    {$set: {status: req.body.status}},
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
