const Category = require("../models/category");

exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, category) => {
    if (err) {
      return res.status(400).json({
        error: "Category not found",
      });
    }
    // single category
    req.category = category;
    console.log(req.category);
    next();
  });
};

exports.createCategory = (req, res) => {
  const category = new Category(req.body);
  category.save((err, category) => {
    if (err || !category) {
      return res.status(400).json({
        error: "Not able to save category",
      });
    }
    return res.json({category});
  });
};

exports.getCategory = (req, res) => {
  return res.json(req.category);
};

exports.getAllCategory = (req, res) => {
  Category.find().exec((err, categories) => {
    if (err) {
      return res.status(400).json({
        error: "No categories found",
      });
    }

    res.json(categories);
  });
};

exports.updateCategory = (req, res) => {
  const category = req.category;
  if (!category) return res.send("No category found");
  category.name = req.body.name;

  category.save((err, updatedCategory) => {
    if (err) {
      return res.status(400).json({
        error: "Not able to update",
      });
    }
    return res.json(updatedCategory);
  });
};

exports.deleteCategory = (req, res) => {
  const category = req.category;
  if (!category) return res.send("No category found");
  category.remove((err, category) => {
    if (err) {
      return res.status(400).json({
        error: "Can't delete",
      });
    }
    return res.json({
      message: "Deleted sucessfully",
    });
  });
};
