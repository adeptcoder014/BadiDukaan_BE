const express = require("express");
const router = express.Router();
const businessRoutes = require("./routes/business");
//===========================================================

router.use("/", businessRoutes);

//===========================================================


module.exports = router;
