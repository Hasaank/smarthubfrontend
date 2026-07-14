import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, default: "" },
    plan: { type: String, default: "free" },
    googleId: { type: String },
  },
  { timestamps: true },
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
