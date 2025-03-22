const express = require("express");
const router = express.Router();
const controller = require("../controllers/businessAdmin");

const checkPermissions = require("../../middleware/checkPermission");
//==========================================
router.post("/", checkPermissions(["manage_roles"]), controller.createBusinessAdmin);
router.get("/", checkPermissions(["manage_roles"]), controller.getAllUsers);
router.get("/:businessAdminId", checkPermissions(["manage_roles"]), controller.getUserById);


module.exports = router;
