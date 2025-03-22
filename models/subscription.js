
const SubscriptionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  plan: { type: mongoose.Schema.Types.ObjectId, ref: "SubscriptionPlan", required: true },
  status: { type: String, enum: ["active", "cancelled", "expired"], default: "active" },
  startedAt: { type: Date, default: Date.now },
  expiresAt: { type: Date }
});

module.exports = mongoose.model("Subscription", SubscriptionSchema);