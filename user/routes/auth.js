const express = require("express");
const router = express.Router();
const controller = require("../controllers/auth");
const checkUserToken = require("../../middleware/checkRole");
//==========================================
router.post("/register-superadmin", controller.registerSuperAdmin);
router.post("/login", controller.login);


module.exports = router;
