const User = require("../models/user");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.user_create_user = async (req, res, next) => {
  try {
    user = await User.find({ email: req.body.email });
    if (user.length >= 1) {
      return res.status(409).json({
        message: "User email already exists"
      });
    }
    await bcrypt.hash(req.body.password, 10, async (err, hash) => {
      if (err) {
        return res.status(500).json({
          error: err
        });
      }

      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        active: true,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone: req.body.phone,
        email: req.body.email,
        namespace: req.body.namespace,
        password: hash,
        created: Date.now()
      });

      result = await user.save();
      console.log(result);
      res.status(201).json({
        message: "User Created"
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err
    });
  }
};

exports.user_login = async (req, res, next) => {
  try {
    user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(401).json({
        message: "Unauthorized"
      });
    }

    await bcrypt.compare(req.body.password, user.password, (err, result) => {
      if (err) {
        res.status(401).json({
          message: "Unauthorized"
        });
      }
      if (result) {
        token = jwt.sign(
          {
            email: user.email,
            userId: user._id,
            namespace: user.namespace
          },
          process.env.JWT_KEY,
          {
            expiresIn: "2160h" // 3 months
          }
        );
        return res.status(200).json({
          message: "Authorized",
          token: token
        });
      }
      //if wrong password
      res.status(401).json({
        message: "Unauthorized"
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err.message
    });
  }
};

exports.user_delete_user = async (req, res, next) => {
  try {
    result = await User.findById(req.params.userId);

    if (!result) {
      return res.status(404).json({
        message: "User not found with specified ID"
      });
    } else {
      await User.deleteOne({ _id: req.params.userId });
      res.status(200).json({
        message: "User deleted"
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err
    });
  }
};
