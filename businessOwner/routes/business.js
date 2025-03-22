const express = require("express");
const router = express.Router();
const controller = require("../controllers/business");
const checkPermissions = require("../../middleware/checkPermission");
//==========================================

router.post("/", checkPermissions(["manage_roles","create_business"]), controller.createBusiness);
router.get("/", checkPermissions(["manage_roles","view_business"]), controller.getBusiness);


module.exports = router;
