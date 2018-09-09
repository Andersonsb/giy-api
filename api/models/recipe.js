const mongoose = require("mongoose");

const recipeSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  active: { type: Boolean, default: false },
  name: { type: String },
  description: { type: String },
  created_by_namespace: { type: String },
  species: { type: String },
  region: { type: String },
  light_start: { type: Number },
  light_end: { type: Number },
  air_temp: { type: Number },
  soil_humidity: { type: Number },
  created: { type: Date },
  modified: { type: Date }
});

module.exports = mongoose.model("Recipe", recipeSchema, "recipes");
