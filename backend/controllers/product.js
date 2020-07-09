const Product = require("../models/product");
const formidable = require("formidable");
const {validationResult} = require("express-validator");
const _ = require("lodash");
const fs = require("fs");

exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
    .populate("category")
    .exec((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "Can't find product",
        });
      }
      req.product = product;
      next();
    });
};

exports.createProduct = (req, res) => {
  // form handling
  let form = new formidable({keepExtensions: true});

  const errors = validationResult(req);
  // checking for errors
  console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].param + " " + errors.array()[0].msg,
    });
  }

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "Problem with image",
      });
    }

    // file handling
    let product = new Product(fields);
    if (file.photo) {
      if (file.photo.size > 3145728) {
        return res.status(400).json({
          error: "File is too big",
        });
      }

      // setting fields for DB
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }

    // save to DB
    product.save((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "Saving failed",
        });
      }
      return res.json(product);
    });
  });
};
