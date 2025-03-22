const ModuleRequestSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  business: { type: mongoose.Schema.Types.ObjectId, ref: "Business", required: true },
  module: { type: mongoose.Schema.Types.ObjectId, ref: "Module", required: true },
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" }
}, { timestamps: true });

module.exports = mongoose.model("ModuleRequest", ModuleRequestSchema);
