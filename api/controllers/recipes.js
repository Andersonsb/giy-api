const Recipe = require("../models/recipe");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const handlers = require("../handlers/handlers");

exports.recipe_create_recipe = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = await jwt.decode(token, process.env.JWT_KEY);

    const recipe = new Recipe({
      _id: new mongoose.Types.ObjectId(),
      active: true,
      name: req.body.name,
      description: req.body.description,
      created_by_namespace: decoded.namespace,
      species: req.body.species,
      region: req.body.region,
      light_start: req.body.light_start,
      light_end: req.body.light_end,
      air_temp: req.body.air_temp,
      soil_humidity: req.body.soil_humidity,
      created: Date.now()
    });

    result = await recipe.save();
    console.log(result);
    res.status(201).json({
      message: "Recipe Created"
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err
    });
  }
};

//gets ALL active
exports.recipe_get_all_recipes = async (req, res, next) => {
  try {
    result = await Recipe.find({ active: true }).select(
      "_id name description created_by_namespace species region light_start light_end air_temp soil_humidiy created "
    );
    const response = {
      count: result.length,
      Recipes: result.map(doc => {
        return {
          _id: doc._id,
          name: doc.name,
          description: doc.description,
          created_by_namespace: doc.namespace,
          species: doc.species,
          region: doc.region,
          light_start: doc.light_start,
          light_end: doc.light_end,
          air_temp: doc.air_temp,
          soil_humidity: doc.soil_humidity,
          created: doc.created
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
