const User = require("../models/user");
const Client = require("../models/client");
const Unit = require("../models/unit");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register_register = async (req, res, next) => {
  try {
    //check if user already exists
    user = await User.find({ email: req.body.email });
    if (user.length >= 1) {
      return res.status(409).json({
        message: "User email already exists"
      });
    }
    //check if client already exists
    client = await Client.find({ email: req.body.email });
    if (user.length >= 1) {
      return res.status(409).json({
        message: "Client email already exists"
      });
    }

    generatedNamespace =
      req.body.first_name.toLowerCase() +
      req.body.last_name.toLowerCase() +
      Math.floor(Math.random() * 1000 + 1);
    console.log(generatedNamespace);

    //create user
    await bcrypt.hash(req.body.password, 10, async (err, hash) => {
      if (err) {
        return res.status(500).json({
          error: err
        });
      }

      //create client
      const client = new Client({
        _id: new mongoose.Types.ObjectId(),
        active: true,
        address: req.body.address,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone: req.body.phone,
        email: req.body.email,
        namespace: generatedNamespace,
        password: hash,
        created: Date.now()
      });
      await client.save();
      console.log("Client created");

      //create user
      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        active: true,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone: req.body.phone,
        email: req.body.email,
        namespace: generatedNamespace,
        password: hash,
        created: Date.now()
      });
      result = await user.save();
      console.log("User created");

      //create unit
      const unit = new Unit({
        _id: new mongoose.Types.ObjectId(),
        active: true,
        name: req.body.unit_name,
        type: {
          type_name: req.body.unit_type_name,
          type_id: req.body.unit_type_id
        },

        namespace: generatedNamespace,

        created: Date.now()
      });
      await unit.save();
      console.log("Unit created");
    });

    res.status(201).json({
      message: "Successfully Registered"
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err
    });
  }
};
