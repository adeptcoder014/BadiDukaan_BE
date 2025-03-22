const Joi = require("joi");

// Joi Validation Schema
const businessAdminValidationSchema = Joi.object({
  name: Joi.string().required().trim().messages({
    "string.empty": "Name is required",
  }),
  mobile: Joi.string().length(10).pattern(/^[0-9]+$/).required().messages({
    "string.empty": "Mobile number is required",
    "string.length": "Mobile number must be exactly 10 digits",
    "string.pattern.base": "Invalid mobile number format",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Invalid email format",
  }),
  password: Joi.string().min(8).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 8 characters long",
  }),
  dob: Joi.date().optional(),
  gender: Joi.string().valid("male", "female", "other").required().messages({
    "any.only": "Gender must be 'male', 'female', or 'other'",
  }),
  address: Joi.object({
    street: Joi.string().optional().trim(),
    city: Joi.string().optional().trim(),
    state: Joi.string().optional().trim(),
    country: Joi.string().optional().trim(),
    zipCode: Joi.string().optional().trim(),
  }),
  bankAccountDetails: Joi.object({
    accountHolderName: Joi.string().optional().trim(),
    accountNumber: Joi.string().optional().trim(),
    bankName: Joi.string().optional().trim(),
    IFSC: Joi.string().optional().trim(),
  }),
  UPIid: Joi.string().optional().trim(),
  referralCode: Joi.string().optional().trim(),
  agreementCheck: Joi.boolean().valid(true).required().messages({
    "any.only": "You must agree to the terms and conditions",
  }),
  business: Joi.string().optional(),
  role: Joi.string().required().messages({
    "string.empty": "Role is required",
  }),
});



module.exports = businessAdminValidationSchema;
