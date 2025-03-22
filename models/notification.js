const NotificationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, enum: ["email", "whatsapp"], required: true },
  message: { type: String, required: true },
  status: { type: String, enum: ["sent", "pending", "failed"], default: "pending" }
}, { timestamps: true });

module.exports = mongoose.model("Notification", NotificationSchema);
