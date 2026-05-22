import mongoose from "mongoose";

const DocumentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true, trim: true },
    icon: { type: String, default: "📄" },
    meta: { type: String, default: "" },
    badge: { type: String, default: "Processing..." },
    badgeClass: { type: String, default: "db-processing" },
    fileUrl: { type: String, default: "" },
    fileKey: { type: String, default: "" },
  },
  { timestamps: true },
);

export default mongoose.models.Document || mongoose.model("Document", DocumentSchema);
