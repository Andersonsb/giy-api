const User = require("../models/user");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.user_create_user = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "User email already exists"
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
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
            user
              .save()
              .then(result => {
                console.log(result);
                res.status(201).json({
                  message: "User Created"
                });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err
                });
              });
          }
        });
      }
    });
};

exports.user_login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then(user => {
      //console.log(user.length);
      if (!user) {
        res.status(401).json({
          message: "Unauthorized"
        });
      }
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) {
          res.status(401).json({
            message: "Unauthorized"
          });
        }
        if (result) {
          token = jwt.sign(
            {
              email: user.email,
              userId: user._id
            },
            process.env.JWT_KEY,
            {
              expiresIn: "1h"
            }
          );
          return res.status(200).json({
            message: "Authorized",
            token: token
          });
        }
        res.status(401).json({
          message: "Unauthorized"
        });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

// function resp (code, message) {
//   return {code: code, message: message}

// }

exports.user_delete_user = (req, res, next) => {
  User.findById(req.params.userId)
    .exec()
    .then(user => {
      if (!user) {
        return res.status(404).json({
          message: "User not found with specified ID"
        });
      } else {
        User.deleteOne({ _id: req.params.userId })
          .exec()
          .then(result => {
            res.status(200).json({
              message: "User deleted"
            });
          });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};
