const BusinessSubmoduleSchema = new mongoose.Schema({
  parentBusiness: { type: mongoose.Schema.Types.ObjectId, ref: "Business", required: true },
  childBusiness: { type: mongoose.Schema.Types.ObjectId, ref: "Business", required: true }
}, { timestamps: true });

module.exports = mongoose.model("BusinessSubmodule", BusinessSubmoduleSchema);
