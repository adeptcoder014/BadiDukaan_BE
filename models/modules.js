const mongoose = require("mongoose");

const ModuleSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true, required: true, trim: true },
    description: { type: String, trim: true },

    icon: { type: String, trim: true }, // URL for the module's icon/logo
    isActive: { type: Boolean, default: true }, // To enable/disable modules
    version: { type: String, default: "1.0" }, // Module version (e.g., "1.0.0")
    metadata: { type: mongoose.Schema.Types.Mixed }, // Extra config/data as needed

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Super Admin who created it
  },
  { timestamps: true } // Automatically manage createdAt & updatedAt
);

module.exports = mongoose.model("Module", ModuleSchema);
               