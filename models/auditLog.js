const AuditLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  action: { type: String, required: true },
  details: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("AuditLog", AuditLogSchema);
