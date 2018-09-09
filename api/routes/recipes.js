const express = require("express");
const router = express.Router();
const RecipeController = require("../controllers/recipes");
const checkAuth = require("../middleware/check-auth");
const isSuperAdmin = require("../middleware/is-super-admin");

router.post("/create", checkAuth, RecipeController.recipe_create_recipe);

router.get("/", checkAuth, RecipeController.recipe_get_all_recipes);

// router.delete(
//   "/:unitId",
//   checkAuth,
//   isSuperAdmin,
//   UnitController.unit_delete_unit
// );

module.exports = router;
