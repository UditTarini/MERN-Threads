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

const orderSchema = new Schema(
  {
    products: [productCartSchema],
    transaction_id: {},
    amount: Number,
    address: String,
    updated: Date,
    status: {
      type: String,
      default: "Received",
      enum: ["Received", "Cancelled", "Processing", "Shipped", "Delivered"],
    },
    user: {
      type: ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const productCart = mongoose.model("porductCart", productCartSchema);

const Order = mongoose.model("Order", orderSchema);

module.exports = {Order, productCart};
