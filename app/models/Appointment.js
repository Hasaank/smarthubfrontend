import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    student: { type: String, required: true, trim: true },
    instructor: { type: String, default: "" },
    time: { type: String, default: "" },
    date: { type: Date },
    type: { type: String, default: "" },
    location: { type: String, default: "" },
    status: {
      type: String,
      enum: ["Confirmed", "In Progress", "Needs Confirmation", "Cancelled", "Completed"],
      default: "Needs Confirmation",
    },
    notes: { type: String, default: "" },
  },
  { timestamps: true },
);

export default mongoose.models.Appointment || mongoose.model("Appointment", AppointmentSchema);
