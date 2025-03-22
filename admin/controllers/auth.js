
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Role = require("../../models/role");


const superAdminCreationValidation = require("../validation/superAdminCreation");
const Admin = require("../../models/admin");
const loginValidation = require("../validation/login");
//==================================================



module.exports = {


  registerSuperAdmin: async (req, res) => {
    try {
      // Validate request body using Joi
      const { error } = superAdminCreationValidation.validate(req.body, { abortEarly: false });
      if (error) {
        return res.status(400).json({
          status: 400,
          errors: error.details.map((err) => err.message.replace(/\"/g, "")),
        });
      }

      const { name, email, mobile, password } = req.body;

      // Check if the Super Admin role exists; if not, create it
      let superAdminRole = await Role.findOne({ where: { name: "super_admin" } });
      if (!superAdminRole) {
        superAdminRole = await Role.create({
          name: "super_admin",
          permissions: JSON.stringify(["ALL_ACCESS"]),
          created_by: null, // System-generated role
        });
      }

      // Check if Super Admin already exists
      const existingUser = await Admin.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({
          status: 400,
          message: "Super Admin already exists",
        });
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create Super Admin user
      const newSuperAdmin = await Admin.create({
        name,
        email,
        mobile,
        password: hashedPassword,
        role_id: superAdminRole.id,
        is_verified: true, // Auto-verified for Super Admin
        created_by: "system",
        updated_by: "system",
      });

      // Generate JWT Token
      const token = jwt.sign(
        { userId: newSuperAdmin.id, role: "super_admin" },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      res.status(201).json({
        status: 201,
        message: "Super Admin registered successfully",
        token,
      });
    } catch (error) {
      console.error("Register Super Admin Error:", error);
      res.status(500).json({
        status: 500,
        message: "Internal Server Error",
      });
    }
  },








  // User Login
  login: async (req, res) => {
    try {
      // Validate request body
      const { error } = loginValidation.validate(req.body);
      if (error) {
        return res.status(400).json({
          status: 400,
          message: error.details[0].message.replace(/\"/g, "")
        });
      }

      const { email, password } = req.body;

      // Check if user exists
      const admin = await Admin.findOne({ email });
      if (!admin) {
        return res.status(400).json({
          status: 400,
          message: "Invalid email"
        });
      }

      // Verify password
      const isMatch = await bcrypt.compare(password, admin?.password);
      if (!isMatch) {
        return res.status(400).json({
          status: 400,
          message: "Invalid password"
        });
      }

      // Generate JWT token
      const token = jwt.sign({ userId: admin._id, role: admin.role }, process.env.JWT_SECRET, { expiresIn: "360m" });

      res.status(200).json({
        message: "Login successful",
        token,
        // 
      });
    } catch (error) {
      console.error("Login Error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },





};
