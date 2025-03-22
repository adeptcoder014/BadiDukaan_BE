const Joi = require("joi");
const mongoose = require("mongoose");

const businessValidationSchema = Joi.object({
  name: Joi.string().trim().min(3).max(100).required()
    .messages({
      "string.empty": "Business name is required",
      "string.min": "Business name must be at least 3 characters",
      "string.max": "Business name cannot exceed 100 characters",
    }),

  type: Joi.string()
    .valid(
      "agriculture",
      "mining",
      "manufacturing",
      "wholesale",
      "retail",
      "logistics",
      "service",
      "financial_services",
      "transportation",
      "utilities",
      "entertainment",
      "media",
      "sports",
      "real_estate",
      "construction",
      "technology",
      "healthcare",
      "education",
      "hospitality",
      "legal_services",
      "consulting",
      "non_profit",
      "government",
      "other"
    ).required()
    .messages({
      "any.only": "Invalid business type. Must be one of: Manufacturer, Wholesaler, Retailer, Logistics, Service, Distributor, Franchise, Ecommerce, Consultant, Agency, Freelancer, Nonprofit, Government, Startup, Corporation, Partnership, Sole Proprietorship, Cooperative, Association",
      "any.required": "Business type is required"
    }),

  description: Joi.string().trim().max(500).optional()
    .messages({
      "string.max": "Description cannot exceed 500 characters",
    }),


  modules: Joi.array().items(
    Joi.string().custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.message("Invalid module ID");
      }
      return value;
    })
  ).optional(),

  isActive: Joi.boolean().default(true),

  // createdBy: Joi.string().custom((value, helpers) => {
  //     if (!mongoose.Types.ObjectId.isValid(value)) {
  //       return helpers.message("Invalid createdBy ID");
  //     }
  //     return value;
  //   }).required()
  //   .messages({
  //     "any.required": "Creator ID is required",
  //   }),

  isDeleted: Joi.boolean().default(false),
});

module.exports = businessValidationSchema;
