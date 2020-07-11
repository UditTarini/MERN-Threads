var User = require("../models/user");
var Order = require("../models/order");

exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "No user found",
      });
    }
    // storing user into profile obj of req
    req.profile = user;
    next();
  });
};

// to get user from req.profile
exports.getUser = (req, res) => {
  // geting rid of unnescessary fields
  req.profile.salt = undefined;
  req.profile.encrypted_password = undefined;
  req.profile.createdAt = undefined;
  req.profile.updatedAt = undefined;

  return res.json(req.profile);
};

exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(
    // find
    {_id: req.profile._id},
    // what to update
    {$set: req.body},

    {
      // cuz we r updating
      new: true,
      // for deprication warn
      useFindAndModify: false,
    },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: "Updation denied",
        });
      }

      // geting rid of unnescessary fields
      user.salt = undefined;
      user.encrypted_password = undefined;
      user.createdAt = undefined;
      user.updatedAt = undefined;

      res.json(user);
    }
  );
};

exports.purchaseList = (req, res) => {
  // find user based on id
  Order.find({
    user: req.profile._id,
  })
    // which model, which field  u want to update
    .populate("user", "_id name")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          error: "No orders yet !",
        });
      }
      return res.json(order);
    });
};

// middleware
exports.pushOrderToPurchaseList = (req, res, next) => {
  let purchases = [];
  req.body.order.products.forEach((product) => {
    purchases.push({
      _id: product._id,
      name: product.name,
      description: product.description,
      category: product.category,
      quantity: product.quantity,
      amount: req.body.order.amount,
      transaction: req.body.order.transaction,
    });
  });

  User.findOneAndUpdate(
    {_id: req.profile._id},
    {$push: {purchases}},
    {new: true},
    (err, purchase) => {
      if (err) {
        return res.status(400).json({
          error: "Unable to save purchase list",
        });
      }
      next();
    }
  );
};
