const businessModel = require("../../models/businessType");
// const Module = require("../models/module"); // Assuming you have a module model
const businessValidation = require("../../validation/business"); // Add Joi validation
const mongoose = require("mongoose");

/**
 * @desc Create a new Business (Super Admin Only)
 * @route POST /superadmin/business
 * @access Super Admin
 */
exports.createBusiness = async (req, res) => {
  try {
    // Validate request body
    const { error } = businessValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ response: error.details[0].message });
    }

    const { name, type, description } = req.body;

    // Check if Business already exists
    // console.log("existingBusiness");
    const existingBusiness = await businessModel.findOne({ name, type });
    // console.log(existingBusiness,);

    // if (existingBusiness.length > 0) {
    if (existingBusiness?.name) {
      return res.status(400).json({
        status: 400,
        response: "Business  already exists",
        existingBusiness
      });
    }
    // console.log('=========================');
    // console.log(
    //   name,
    //   type, // e.g., Manufacturer, Retailer, etc.
    //   description,
    //   "67cffcda5f82f134b13b8e2c",
    //   req.user._id,
    // );

    // Create new Business
    const newBusiness = new businessModel({
      name,
      type, // e.g., Manufacturer, Retailer, etc.
      description,
      owner: "67cffcda5f82f134b13b8e2c",
      createdBy: '67cffcda5f82f134b13b8e2c', // Super Admin ID
    });
    // console.log('=========================', newBusiness);

    await newBusiness.save();
    // console.log('=========================');

    return res.status(201).json({
      status: 201,
      response: "Business created successfully",
      business: newBusiness,
    });
  } catch (error) {
    console.error("❌ Error creating business:", error);
    return res.status(500).json({
      status: 500,
      error
    });
  }
};

/**
 * Get Businesses with optional filters
 */
exports.getBusiness = async (req, res) => {
  try {


    // Extract query parameters (for filtering)
    const { name, type, isActive } = req.query;

    // Build a dynamic filter object
    const filter = {};
    if (name) filter.name = name;
    if (type) filter.type = type; // e.g., Manufacturer, Retailer, etc.
    if (isActive !== undefined) filter.isActive = isActive === "true";

    // Fetch matching businesses
    const businesses = await businessModel.find(filter);

    if (businesses.length === 0) {
      return res.status(404).json({ status: 404, response: "No businesses found" });
    }

    return res.status(200).json({
      response: "Businesses retrieved successfully",
      data: businesses,
    });
  } catch (error) {
    console.error("❌ Error fetching business:", error);
    return res.status(500).json({ response: "Internal Server Error" });
  }
};

/**
 * @desc Assign Modules to a Business (Super Admin Only)
 * @route POST /superadmin/business/:id/modules
 * @access Super Admin
 */
exports.assignModules = async (req, res) => {
  try {
    const { id } = req.params;
    const { modules } = req.body; // Array of module IDs

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ response: "Invalid Business ID" });
    }

    const business = await Business.findById(id);
    if (!business) {
      return res.status(404).json({ response: "Business not found" });
    }

    // Validate if modules exist
    const existingModules = await Module.find({ _id: { $in: modules } });
    if (existingModules.length !== modules.length) {
      return res.status(400).json({ response: "Some modules are invalid" });
    }

    // Assign Modules
    business.modules = modules;
    await business.save();

    return res.status(200).json({
      response: "Modules assigned successfully",
      business,
    });
  } catch (error) {
    console.error("❌ Error assigning modules:", error);
    return res.status(500).json({ response: "Internal Server Error" });
  }
};
