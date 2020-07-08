var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var {ObjectId} = mongoose.Schema;

const productCartSchema = new Schema({
  product: {
    type: ObjectId,
    ref: "Product",
  },
  name: String,
  count: Number,
  price: Number,
});

const productCart = mongoose.model("porductCart", productCartSchema);

const orderSchema = new Schema(
  {
    products: [productCartSchema],
    transaction_id: {},
    amount: Number,
    address: String,
    updated: Date,
    user: {
      type: ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
