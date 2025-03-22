const mongoose = require("mongoose");

const businessSchema = new mongoose.Schema(
  {
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
      default: "other"
    },
    description: { type: String, trim: true },

    // Link to the Business Admin (owner)
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    // Directly associate modules with this business
    modules: [
      {
        module: { type: mongoose.Schema.Types.ObjectId, ref: "Module", required: true },
        isApproved: { type: Boolean, default: false } // Approval flag if needed
      }
    ],

    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Business", businessSchema);
