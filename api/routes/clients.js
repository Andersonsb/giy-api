const express = require("express");
const router = express.Router();
const ClientsController = require("../controllers/clients");
const checkAuth = require("../middleware/check-auth");
const isSuperAdmin = require("../middleware/is-super-admin");

router.post(
  "/signup",
  checkAuth,
  isSuperAdmin,
  ClientsController.clients_create_client
);

router.get("/", ClientsController.clients_get_all);

router.delete("/:clientId", checkAuth, ClientsController.clients_delete_client);

module.exports = router;
