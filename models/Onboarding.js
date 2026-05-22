import mongoose from "mongoose";

const OnboardingSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    currentStep: { type: Number, default: 2 },
    selectedBusinessId: { type: String, default: "driving-school" },
    selectedBusiness: {
      id: String,
      name: String,
      icon: String,
      desc: String,
      toolkit: String,
    },
    businessName: { type: String, default: "" },
    greeting: { type: String, default: "" },
    integrations: [
      {
        id: String,
        connected: Boolean,
      },
    ],
    voiceSettings: [
      {
        id: String,
        label: String,
        value: String,
        selected: Boolean,
      },
    ],
    onboardingStatus: {
      type: String,
      enum: ["in_progress", "completed"],
      default: "in_progress",
    },
  },
  { timestamps: true },
);

export default mongoose.models.Onboarding || mongoose.model("Onboarding", OnboardingSchema);
