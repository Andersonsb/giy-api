const express = require("express");
const router = express.Router();
const RegisterController = require("../controllers/register");
const checkAuth = require("../middleware/check-auth");
const isSuperAdmin = require("../middleware/is-super-admin");

router.post("/", RegisterController.register_register);

module.exports = router;
