import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDB } from "../config/db.js";
import { User } from "../models/User.js";
import { Donation } from "../models/Donation.js";
import { HelpRequest } from "../models/HelpRequest.js";
import { Assignment } from "../models/Assignment.js";

dotenv.config();

const seed = async () => {
  await connectDB();

  await Promise.all([
    Assignment.deleteMany({}),
    Donation.deleteMany({}),
    HelpRequest.deleteMany({}),
    User.deleteMany({}),
  ]);

  const [donor, needy, volunteer] = await User.create([
    {
      name: "Aarav Donor",
      email: "donor@example.com",
      password: "password123",
      role: "donor",
      phone: "9000000001",
      address: "Delhi",
    },
    {
      name: "Sana Needy",
      email: "needy@example.com",
      password: "password123",
      role: "needy",
      phone: "9000000002",
      address: "Lucknow",
      verificationDetails: {
        governmentId: "UPID4455",
        familySize: 5,
        incomeRange: "Below 10000",
        notes: "Single parent household",
      },
    },
    {
      name: "Ishita Volunteer",
      email: "volunteer@example.com",
      password: "password123",
      role: "volunteer",
      phone: "9000000003",
      address: "Mumbai",
    },
  ]);

  const donation = await Donation.create({
    donor: donor._id,
    category: "food",
    quantity: 10,
    description: "Meal kits for families",
    status: "paid",
  });

  const helpRequest = await HelpRequest.create({
    needy: needy._id,
    category: "food",
    title: "Food support for 2 weeks",
    details: "Need groceries for family of 5.",
    urgency: "high",
    status: "approved",
  });

  await Assignment.create({
    donation: donation._id,
    helpRequest: helpRequest._id,
    assignedBy: volunteer._id,
    completed: true,
    note: "Dispatched through local center",
  });

  console.log("Seed data inserted successfully");
  await mongoose.connection.close();
};

seed().catch(async (error) => {
  console.error("Seed failed", error);
  await mongoose.connection.close();
  process.exit(1);
});
