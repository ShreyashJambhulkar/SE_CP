import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { ROLES } from "../constants/index.js";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: 6 },
    phone: { type: String, trim: true },
    role: {
      type: String,
      enum: Object.values(ROLES),
      required: true,
    },
    address: { type: String },
    isActive: { type: Boolean, default: true },
    verificationDetails: {
      governmentId: String,
      incomeRange: String,
      familySize: Number,
      documentUrl: String,
      notes: String,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function hashPassword(next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = function comparePassword(password) {
  return bcrypt.compare(password, this.password);
};

export const User = mongoose.model("User", userSchema);
