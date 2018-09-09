const Unit = require("../models/unit");
const Recipe = require("../models/recipe");
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

exports.unit_set_recipe = async (req, res, next) => {
  try {
    console.log(req.body.unitId);
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.decode(token, process.env.JWT_KEY);
    unit = await Unit.findOne({ _id: req.body.unitId });
    recipe = await Recipe.findOne({ _id: req.body.recipeId }).select(
      "_id name description created_by_namespace species region light_start light_end air_temp soil_humidity "
    );
    console.log(recipe);
    if (!unit) {
      return res.status(404).json({
        message: "This Unit does not exist"
      });
    }
    if (!recipe) {
      return res.status(404).json({
        message: "This Recipe does not exist"
      });
    }

    if (unit.namespace !== decoded.namespace) {
      return res.status(401).json({
        message: "Unauthorized"
      });
    }

    await Unit.updateOne(
      { _id: req.body.unitId },
      {
        $set: {
          recipe: {
            recipe_id: recipe._id,
            name: recipe.name,
            description: recipe.description,
            created_by_namespace: recipe.created_by_namespace,
            species: recipe.species,
            region: recipe.region,
            light_start: recipe.light_start,
            light_end: recipe.light_end,
            air_temp: recipe.air_temp,
            soil_humidity: recipe.soil_humidity
          }
        }
      }
    );
    res.status(201).json({
      message: "Recipe set successfully"
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err
    });
  }
};
