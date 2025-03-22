const express = require("express");
const router = express.Router();
const controller = require("../controllers/modules");
const checkPermissions = require("../../middleware/checkPermission");
//==========================================

router.post("/", checkPermissions(["manage_roles"]), controller.createBusiness);


module.exports = router;
