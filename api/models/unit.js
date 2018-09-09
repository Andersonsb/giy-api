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
    recipe_id: mongoose.Schema.Types.ObjectId,
    active: { type: Boolean, default: false },

    name: { type: String },
    description: { type: String },
    created_by_namespace: { type: String },
    species: { type: String },
    region: { type: String },
    light_start: { type: Number },
    light_end: { type: Number },
    air_temp: { type: Number },
    soil_humidity: { type: Number }
  },

  namespace: {
    type: String,
    required: true
  },
  created: { type: Date },
  modified: { type: Date }
});

module.exports = mongoose.model("Unit", unitSchema, "units");
