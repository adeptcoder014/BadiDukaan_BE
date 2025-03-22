const express = require("express");
const router = express.Router();
const adminAuthRoutes = require("./routes/auth");
//===========================================================

router.use("/auth", adminAuthRoutes);

//===========================================================


module.exports = router;
