const express = require("express");
const router = express.Router();
const controller = require("../controllers/roles");

const checkPermissions = require("../../middleware/checkPermission");
//==========================================
router.get("/", checkPermissions(["manage_roles"]), controller.getRoles);


module.exports = router;
