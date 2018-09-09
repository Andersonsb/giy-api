const jwt = require("jsonwebtoken");
const User = require("../models/user");
const mongoose = require("mongoose");

// checks if tokens belongs to SUPERADMIN type
module.exports = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  //console.log(token);
  const decoded = jwt.decode(token, process.env.JWT_KEY);

  User.findById(decoded.userId)
    .select("type")
    .exec()
    .then(doc => {
      if (doc) {
        if (doc.type === "SUPERADMIN") {
          next();
        } else {
          return res.status(401).json({
            message: "Unauthorized token for specific resource"
          });
        }
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided id" });
      }
    })
    .catch(err => {
      console.log(err);
    });
};
