import mongoose from "mongoose";

const UserDashboardSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    activePanel: { type: String, default: "overview" },
    activeDocument: { type: String, default: "policy" },
    activeSettingsTabId: { type: String, default: "profile" },
    selectedPlanId: { type: String, default: "pro" },
    billingCycle: { type: String, default: "monthly" },
    businessProfile: {
      businessName: { type: String, default: "" },
      businessType: { type: String, default: "" },
      website: { type: String, default: "" },
    },
    settingsToggles: {
      claude: { type: Boolean, default: true },
      streaming: { type: Boolean, default: true },
      history: { type: Boolean, default: true },
    },
    billingProfile: {
      autopayEnabled: { type: Boolean, default: true },
      emailReceipts: { type: Boolean, default: true },
      vatNumber: { type: String, default: "" },
      billingEmail: { type: String, default: "" },
      cardholderName: { type: String, default: "" },
      paymentMethod: {
        brand: { type: String, default: "Visa" },
        last4: { type: String, default: "4242" },
        expiry: { type: String, default: "08/28" },
      },
    },
    automations: [
      {
        id: String,
        enabled: Boolean,
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.models.UserDashboard ||
  mongoose.model("UserDashboard", UserDashboardSchema);
