
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const roleModel = require("../../models/role");


// const superAdminCreationValidation = require("../validation/superAdminCreation");
// const adminModel = require("../models/profile");
// const loginValidation = require("../validation/login");
// //==================================================



// module.exports = {

//   // Register Super Admin
//   registerSuperAdmin: async (req, res) => {
//     try {
//       // Validate request body using Joi
//       // Validate request body using Joi
//       const { error } = superAdminCreationValidation.validate(req.body, { abortEarly: false });
//       if (error) {
//         return res.status(400).json({
//           status: 400,
//           errors: error.details.map(err => err.message.replace(/\"/g, ""))
//         });
//       }


//       const { name, email, mobile, password } = req.body;
//       let superAdminRole = await roleModel.findOne({ name: "super_admin" });
//       if (!superAdminRole) {
//         superAdminRole = await roleModel.create({ name: "super_admin", permissions: ["ALL_ACCESS"] });
//       }
//       // Check if Super Admin already exists
//       const existingUser = await adminModel.findOne({ email });
//       if (existingUser) {
//         return res.status(400).json({
//           status: 400,
//           message: "Super Admin already exists"
//         });
//       }

//       // Fetch or create Super Admin role

//       // Hash password
//       const salt = await bcrypt.genSalt(10);
//       const hashedPassword = await bcrypt.hash(password, salt);

//       // Create Super Admin user
//       const newSuperAdmin = new adminModel({
//         name,
//         email,
//         mobile,
//         password: hashedPassword,
//         role: superAdminRole._id,
//         isVerified: true, // Super Admin is auto-verified
//       });

//       await newSuperAdmin.save();

//       // Generate JWT Token
//       const token = jwt.sign({ userId: newSuperAdmin._id, role: "Super Admin" }, process.env.JWT_SECRET, { expiresIn: "7d" });

//       res.status(201).json({ message: "Super Admin registered successfully", token });
//     } catch (error) {
//       console.error("Register Super Admin Error:", error);
//       res.status(500).json({ message: "Internal Server Error" });
//     }
//   },









//   // User Login
//   login: async (req, res) => {
//     try {
//       // Validate request body
//       const { error } = loginValidation.validate(req.body);
//       if (error) {
//         return res.status(400).json({ message: error.details[0].message.replace(/\"/g, "") });
//       }

//       const { email, password } = req.body;

//       // Check if user exists
//       const admin = await adminModel.findOne({ email });
//       if (!admin) {
//         return res.status(400).json({ message: "Invalid email or password" });
//       }

//       // Verify password
//       const isMatch = await bcrypt.compare(password, admin?.password);
//       if (!isMatch) {
//         return res.status(400).json({ message: "Invalid email or password" });
//       }

//       // Generate JWT token
//         const token = jwt.sign({ userId: admin._id, role: admin.role }, process.env.JWT_SECRET, { expiresIn: "1m" });

//       res.status(200).json({
//         message: "Login successful",
//         token,
//         // 
//       });
//     } catch (error) {
//       console.error("Login Error:", error);
//       res.status(500).json({ message: "Internal Server Error" });
//     }
//   },





// };
