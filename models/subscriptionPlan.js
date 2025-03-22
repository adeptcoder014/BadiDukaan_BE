const SubscriptionPlanSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  price: { type: Number, required: true },
  durationDays: { type: Number, required: true }
});

module.exports = mongoose.model("SubscriptionPlan", SubscriptionPlanSchema);