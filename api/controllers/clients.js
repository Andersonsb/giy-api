const Client = require("../models/client");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
exports.clients_create_client = async (req, res, next) => {
  try {
    client = await Client.find({ email: req.body.email });
    if (client.length >= 1) {
      return res.status(409).json({
        message: "Client email already exists"
      });
    }
    bcrypt.hash(req.body.password, 10, async (err, hash) => {
      if (err) {
        return res.status(500).json({
          error: err
        });
      }
      const client = new Client({
        _id: new mongoose.Types.ObjectId(),
        active: true,
        address: req.body.address,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone: req.body.phone,
        email: req.body.email,
        namespace: req.body.namespace,
        password: hash,
        created: Date.now()
      });

      await client.save();

      res.status(201).json({
        message: "Client Created"
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err
    });
  }
};

exports.clients_get_all = async (req, res, next) => {
  try {
    result = await Client.find().select("_id first_name last_name namespace");
    const response = {
      count: result.length,
      Clients: result.map(doc => {
        return {
          _id: doc._id,
          first_name: doc.first_name,
          last_name: doc.last_name,
          namespace: doc.namespace
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

exports.clients_delete_client = async (req, res, next) => {
  try {
    client = await Client.findById(req.params.clientId);
    if (!client) {
      return res.status(404).json({
        message: "Client not found with specified ID"
      });
    }

    result = await Client.deleteOne({ _id: req.params.clientId });
    res.status(200).json({
      message: "Client deleted"
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err
    });
  }
};
