import mongoose from "mongoose";

const AutomationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    automationId: { type: String, required: true },
    name: { type: String, required: true },
    desc: { type: String, default: "" },
    trigger: { type: String, default: "" },
    triggerClass: { type: String, default: "" },
    enabled: { type: Boolean, default: true },
    stats: [
      {
        value: String,
        label: String,
        className: String,
      },
    ],
  },
  { timestamps: true },
);

AutomationSchema.index({ userId: 1, automationId: 1 }, { unique: true });

export default mongoose.models.Automation || mongoose.model("Automation", AutomationSchema);
