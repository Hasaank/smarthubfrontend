import mongoose from "mongoose";

const LeadSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true, trim: true },
    source: { type: String, default: "" },
    status: { type: String, default: "" },
    priority: {
      type: String,
      enum: ["Hot", "Warm", "Cold", "Won"],
      default: "Warm",
    },
    pipelineStage: {
      type: String,
      enum: ["new-inquiry", "qualified", "booked"],
      default: "new-inquiry",
    },
    packageInterest: { type: String, default: "" },
    nextStep: { type: String, default: "" },
    phone: { type: String, default: "" },
    email: { type: String, default: "" },
    notes: { type: String, default: "" },
  },
  { timestamps: true },
);

export default mongoose.models.Lead || mongoose.model("Lead", LeadSchema);
