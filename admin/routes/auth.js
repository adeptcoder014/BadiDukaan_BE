const express = require("express");
const router = express.Router();
const controller = require("../controllers/auth");
//==========================================
router.post("/register", controller.registerSuperAdmin);
router.post("/login", controller.login);


module.exports = router;
