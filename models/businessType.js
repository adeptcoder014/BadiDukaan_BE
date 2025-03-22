const mongoose = require("mongoose");

const businessTypeSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true, trim: true },
  type: {
    type: String,
    enum: [
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
    ],
    required: true,
    default: "other",
  },

  description: { type: String, trim: true },
  allowedModules: [{ type: mongoose.Schema.Types.ObjectId, ref: "Module" }], // Modules allowed for this type
  isActive: { type: Boolean, default: true }, // Active status
}, { timestamps: true });

module.exports = mongoose.model("BusinessType", businessTypeSchema);
