const businessModel = require("../../models/business");
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
    const existingBusiness = await businessModel.findOne({ name });
    if (existingBusiness) {
      return res.status(400).json({ status: 400, response: "Business name already exists" });
    }

    // Create new Business
    const newBusiness = new businessModel({
      name,
      type, // e.g., Manufacturer, Retailer, etc.
      description,
      owner: "67cffcda5f82f134b13b8e2c",
      createdBy: req.user._id, // Super Admin ID
    });

    await newBusiness.save();

    return res.status(201).json({
      response: "Business created successfully",
      business: newBusiness,
    });
  } catch (error) {
    console.error("❌ Error creating business:", error);
    return res.status(500).json({ response: "Internal Server Error" });
  }
};

