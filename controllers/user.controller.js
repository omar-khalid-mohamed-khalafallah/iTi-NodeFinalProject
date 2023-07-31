const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const Product = require("../models/product.model");
const url = "mongodb://127.0.0.1:27017/online-shop";
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

exports.signup = async (req, res, next) => {
  await mongoose.connect(url);
  let hashedPass = await bcrypt.hash(req.body.password, 10);

  let found = await User.findOne({
    email: req.body.email,
    password: hashedPass
  });
  if (!found) {
    req.body.password = hashedPass;
    await new User(req.body).save();
    res.json("Done");
  } else res.json("user already exists");

  mongoose.disconnect();
};

exports.login = async (req, res, next) => {
  try {
    await mongoose.connect(url);

    let found = await User.findOne({
      email: req.body.email
    });
    console.log(found);
    if (found) {
      const isMatch = await bcrypt.compare(req.body.password, found.password);
      if (isMatch) {
        const userId = found.id;
        const accessToken = generateAccessToken({ userId });
        res.json({ message: "logged in", token: accessToken });
      } else res.json("password did not match");
    } else res.json("user not found");
  } catch (e) {
    res.status(403).send("error in login");
  }
  mongoose.disconnect();
};

exports.addTocart = async (req, res, next) => {
  await mongoose.connect(url);
  let products = await Product.find();
  let flag = 0;
  let arr = req.body.cart;
  for (const product of products) {
    if (arr.includes(product.name)) {
      flag++;
    }
  }
  if (flag === arr.length) {
    let user = await User.findOne({ _id: req.user.userId });
    if (user) {
      if (user.cart) {
        let oldCart = [...user.cart];

        await User.updateOne(
          { _id: req.user.userId },
          { cart: oldCart.concat(req.body.cart) }
        );
      } else {
        await User.updateOne(
          { _id: req.user.userId },
          { cart: [...req.body.cart] }
        );
      }

      res.json("Done");
    }
  } else {
    res.json("product not found");
  }

  mongoose.disconnect();
};

function generateAccessToken(user) {
  return jwt.sign(user, "secret123", {
    expiresIn: "1h"
  });
}

exports.authenticateToken = function (req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, "secret123", (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};
