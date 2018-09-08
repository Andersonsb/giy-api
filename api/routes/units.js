const express = require("express");
const router = express.Router();
const UnitController = require("../controllers/units");
const checkAuth = require("../middleware/check-auth");
const isSuperAdmin = require("../middleware/is-super-admin");

// router.post("/create", UnitController.unit_create_unit);

// router.get("/my-units", checkAuth, UnitController.units_get_all_mine);

// router.delete(
//   "/:unitId",
//   checkAuth,
//   isSuperAdmin,
//   UnitController.unit_delete_unit
// );

module.exports = router;