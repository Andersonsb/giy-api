const Unit = require("../models/unit");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.unit_create_unit = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.decode(token, process.env.JWT_KEY);

    const unit = new Unit({
      _id: new mongoose.Types.ObjectId(),
      active: true,
      name: req.body.name,
      type: {
        type_name: req.body.type_name,
        type_id: req.body.type_id
      },

      namespace: decoded.namespace,

      created: Date.now()
    });

    result = await unit.save();
    console.log(result);
    res.status(201).json({
      message: "Unit Created"
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err
    });
  }
};

//get my units by namespace on my token
exports.units_get_all_mine = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.decode(token, process.env.JWT_KEY);

    result = await Unit.find({ namespace: decoded.namespace }).select(
      "_id active name type namespace recipe "
    );
    const response = {
      count: result.length,
      Units: result.map(doc => {
        return {
          _id: doc._id,
          active: doc.active,
          name: doc.name,
          type: doc.type,
          namespace: doc.namespace,
          recipe: doc.recipe
        };
      })
    };
    res.status(200).json({ response });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err
    });
  }
};
