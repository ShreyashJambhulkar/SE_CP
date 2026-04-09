import mongoose from "mongoose";
import { DONATION_CATEGORIES, DONATION_STATUS } from "../constants/index.js";

const donationSchema = new mongoose.Schema(
  {
    donor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    category: {
      type: String,
      enum: DONATION_CATEGORIES,
      required: true,
    },
    amount: { type: Number, default: 0 },
    quantity: { type: Number, default: 1 },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: Object.values(DONATION_STATUS),
      default: DONATION_STATUS.PLEDGED,
    },
    impactMessage: { type: String },
  },
  { timestamps: true }
);

export const Donation = mongoose.model("Donation", donationSchema);
