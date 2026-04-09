import mongoose from "mongoose";
import { REQUEST_CATEGORIES, REQUEST_STATUS } from "../constants/index.js";

const helpRequestSchema = new mongoose.Schema(
  {
    needy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    category: {
      type: String,
      enum: REQUEST_CATEGORIES,
      required: true,
    },
    title: { type: String, required: true },
    details: { type: String, required: true },
    urgency: { type: String, enum: ["low", "medium", "high"], default: "medium" },
    status: {
      type: String,
      enum: Object.values(REQUEST_STATUS),
      default: REQUEST_STATUS.PENDING,
    },
    verificationDocument: String,
    adminNote: String,
    resolvedAt: Date,
  },
  { timestamps: true }
);

export const HelpRequest = mongoose.model("HelpRequest", helpRequestSchema);
