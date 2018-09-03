const mongoose = require("mongoose");

const clientSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  Address: { type: String },
  phone: {
    type: String
  },
  namespace: {
    type: String
  },
  active: {
    type: Boolean
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  },
  password: { type: String, required: true },
  created: { type: Date },
  modified: { type: Date },
  end_date: { type: Date, default: null }
});

module.exports = mongoose.model("Client", clientSchema, "clients");
