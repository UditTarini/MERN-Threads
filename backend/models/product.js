var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var {ObjectId} = mongoose.Schema;

const productSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 100,
    },
    description: {
      type: String,
      trim: true,
      required: true,
      maxlength: 4000,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    price: {
      type: Number,
      trim: true,
      required: true,
      maxlength: 10,
    },
    category: {
      type: ObjectId,
      ref: "Category",
      required: true,
    },
    stock: {
      type: Number,
    },
    sold: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
