import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
  {
    donation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Donation",
      required: true,
    },
    helpRequest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "HelpRequest",
      required: true,
    },
    assignedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    note: String,
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Assignment = mongoose.model("Assignment", assignmentSchema);
