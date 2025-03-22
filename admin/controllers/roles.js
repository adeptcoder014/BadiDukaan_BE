
const roleModel = require("../../models/role");

//==================================================



module.exports = {


  getRoles: async (req, res) => {
    try {
      const roles = await roleModel.find({});
      res.status(200).json({ message: "Roles retrieved successfully", roles });
    } catch (error) {
      console.error("Get Roles Error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },








};
