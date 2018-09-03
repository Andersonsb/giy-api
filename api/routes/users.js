const express = require("express");
const router = express.Router();
const UserController = require("../controllers/users");
const checkAuth = require("../middleware/check-auth");
const isSuperAdmin = require("../middleware/is-super-admin");

router.post("/signup", UserController.user_create_user);

router.post("/login", UserController.user_login);

router.delete(
  "/:userId",
  checkAuth,
  isSuperAdmin,
  UserController.user_delete_user
);

module.exports = router;
