const express = require("express");
const router = express.Router();
const adminAuthRoutes = require("./routes/auth");
const adminBusinessRoutes = require("./routes/business");
const rolesRoutes = require("./routes/role");
const businessAdminRoutes = require("./routes/businessAdmin");
const modulesRoutes = require("./routes/modules");

//===========================================================

router.use("/auth", adminAuthRoutes);
router.use("/business-type", adminBusinessRoutes);
router.use("/business-admin", businessAdminRoutes);
router.use("/modules", modulesRoutes);
router.use("/roles", rolesRoutes);

//===========================================================


module.exports = router;

