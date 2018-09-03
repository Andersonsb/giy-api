const Client = require("../models/client");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

exports.clients_create_client = (req, res, next) => {
  Client.find({ email: req.body.email })
    .exec()
    .then(client => {
      if (client.length >= 1) {
        return res.status(409).json({
          message: "Client email already exixts"
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
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
            client
              .save()
              .then(result => {
                //console.log(result);
                res.status(201).json({
                  message: "Client Created"
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

exports.clients_get_all = (req, res, next) => {
  Client.find()
    .select("_id first_name last_name namespace")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        Clients: docs.map(doc => {
          return {
            _id: doc._id,
            first_name: doc.first_name,
            last_name: doc.last_name,
            namespace: doc.namespace
          };
        })
      };
      res.status(200).json({ response });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.clients_delete_client = (req, res, next) => {
  Client.findById(req.params.userId)
    .exec()
    .then(client => {
      if (!client) {
        return res.status(404).json({
          message: "Client not found with specified ID"
        });
      } else {
        Client.deleteOne({ _id: req.params.userId })
          .exec()
          .then(result => {
            res.status(200).json({
              message: "Client deleted"
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
