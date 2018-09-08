const mongoose = require("mongoose");

const unitSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  active: {
    type: Boolean
  },
  name: {
    type: String,
    required: true
  },

  type: {
    type_name: { type: String, default: "standard001" },
    type_id: { type: String, default: "001" }
  },
  recipe: {
    active: { type: Boolean, default: false },
    name: { type: String, default: null },
    species: { type: String, default: null },
    region: { type: String, default: null },
    light_start: { type: Number, default: null },
    light_end: { type: Number, default: null },
    air_temp: { type: Number, default: null },
    soil_humidity: { type: Number, default: null }
  },

  namespace: {
    type: String,
    required: true
  },
  created: { type: Date },
  modified: { type: Date }
});

module.exports = mongoose.model("Unit", unitSchema, "units");
