const express = require("express");
const router = express.Router();
const adminRoutes = require("./admin/routes");
const businessOwnerRoutes = require("./businessOwner/routes");

//=================================
router.use("/super-admin", adminRoutes);
router.use("/business-owner", businessOwnerRoutes);

//=================================

module.exports = router;
