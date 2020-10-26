const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
    .populate("Category")
    .exec((err, product) => {
      if (err) {
        console.log(err);
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

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "Problem with image",
      });
    }

    const {name, description, price, category, stock} = fields;

    if (!name || !description || !category || !price || !stock) {
      return res.status(400).json({
        error: "something went wrong",
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
        console.log(err);
        return res.status(400).json({
          error: "Saving failed",
        });
      }
      return res.json(product);
    });
  });
};

exports.getProduct = (req, res) => {
  // cuz bulky file will load slow
  req.product.photo = undefined;
  return res.json(req.product);
};

//middleware to load photo in background
exports.photo = (req, res, next) => {
  // check is data is a data or not
  if (req.product.photo.data) {
    res.set("Content-Type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};

exports.deleteProduct = (req, res) => {
  const product = req.product;
  if (!product) return res.send("No product found");
  product.remove((err, product) => {
    if (err) {
      return res.status(400).json({
        error: "Can't delete",
      });
    }
    return res.json({
      msg: "Deleted succesfully",
    });
  });
};

exports.updateProduct = (req, res) => {
  let form = new formidable({keepExtensions: true});

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "Problem with image",
      });
    }

    // updation
    let product = req.product;
    product = _.extend(product, fields);

    // file handling

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
          error: "Updation failed",
        });
      }
      return res.json(product);
    });
  });
};

exports.getAllProducts = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 36;
  let sortBy = req.query.sortBy ? parseInt(req.query.sortBy) : "_id";

  Product.find()
    .select("-photo")
    .populate("Category")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((error, products) => {
      if (error) {
        console.log(error);
        return res.status(400).json({
          error: "can't get products",
        });
      }

      return res.json(products);
    });
};

exports.updateStock = (req, res, next) => {
  let bulkWriteOperation = req.body.order.products.map((product) => {
    return {
      updateOne: {
        // where to update
        filter: {_id: product._id},
        // what to update
        update: {$inc: {stock: -product.count, sold: +product.count}},
      },
    };
  });

  Product.bulkWrite(bulkWriteOperation, {}, (err, product) => {
    if (err) {
      return res.status(400).json({
        error: "Bulk operation failed",
      });
    }

    next();
  });
};

exports.getAllUniqueCategory = (req, res) => {
  Product.distinct("category", {}, (err, category) => {
    if (err) {
      if (err) {
        return res.status(400).json({
          error: "No category found",
        });
      }
    }
    res.json(category);
  });
};
