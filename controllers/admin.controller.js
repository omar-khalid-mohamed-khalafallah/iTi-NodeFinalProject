const Product = require("../models/product.model");
const User = require("../models/user.model");
const url = "mongodb://127.0.0.1:27017/online-shop";
const mongoose = require("mongoose");

exports.getAllproducts = async (req, res, next) => {
  await mongoose.connect(url);

  try {
    const user = await User.findOne({ _id: req.user.userId });
    if (user.isAdmin === "admin") {
      let allProducts = await Product.find();
      res.json(allProducts);
    } else {
      res.json("you are not admin");
    }
  } catch {
    res.json("user not found");
  }
  mongoose.disconnect();
};

exports.addProduct = async (req, res, next) => {
  await mongoose.connect(url);
  try {
    const user = await User.findOne({ _id: req.user.userId });
    if (user.isAdmin === "admin") {
      await new Product({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description
      }).save();
      res.json("Product added successfully");
    } else {
      res.json("you are not admin");
    }
  } catch {
    res.json("User not found");
  }
  mongoose.disconnect();
};

exports.updateProduct = async (req, res, next) => {
  await mongoose.connect(url);
  try {
    const user = await User.findOne({ _id: req.user.userId });
    if (user.isAdmin === "admin") {
      await Product.updateOne({ name: req.body.name }, req.body);
      res.json("Product updated successfully");
    } else {
      res.json("you are not admin");
    }
  } catch {
    res.json("User not found");
  }

  mongoose.disconnect();
};

exports.deleteProduct = async (req, res, next) => {
  await mongoose.connect(url);
  try {
    const user = await User.findOne({ _id: req.user.userId });
    if (user.isAdmin === "admin") {
      await Product.deleteOne({ name: req.body.name });
      res.status(204).json("Product deleted successfully");
    } else {
      res.json("you are not admin");
    }
  } catch {
    res.json("User not found");
  }
  mongoose.disconnect();
};

exports.getAllusers = async (req, res, next) => {
  await mongoose.connect(url);
  try {
    const user = await User.findOne({ _id: req.user.userId });
    if (user.isAdmin === "admin") {
      let allUsers = await User.find();
      res.json(allUsers);
    } else {
      res.json("you are not admin");
    }
  } catch {
    res.json("User not found");
  }
  mongoose.disconnect();
};

exports.deleteUser = async (req, res, next) => {
  await mongoose.connect(url);
  try {
    const user = await User.findOne({ _id: req.user.userId });
    if (user.isAdmin === "admin") {
      await User.deleteOne({ email: req.body.email });
      res.status(204).json("deleted the user");
    } else {
      res.json("you are not admin");
    }
  } catch {
    res.json("User not found");
  }
  mongoose.disconnect();
};
