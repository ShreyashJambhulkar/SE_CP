import mongoose from "mongoose";
import { User } from "../models/User.js";
import { Donation } from "../models/Donation.js";
import { HelpRequest } from "../models/HelpRequest.js";
import { Assignment } from "../models/Assignment.js";

export const dashboardStats = async (req, res) => {
  const [totalDonations, activeRequests, completedCases, totalUsers, categoryBreakdown] =
    await Promise.all([
      Donation.countDocuments(),
      HelpRequest.countDocuments({ status: { $in: ["pending", "verified", "approved"] } }),
      HelpRequest.countDocuments({ status: "fulfilled" }),
      User.countDocuments(),
      Donation.aggregate([
        { $group: { _id: "$category", totalAmount: { $sum: "$amount" }, count: { $sum: 1 } } },
      ]),
    ]);

  return res.json({
    stats: { totalDonations, activeRequests, completedCases, totalUsers },
    categoryBreakdown,
  });
};

export const listUsers = async (req, res) => {
  const { role, search } = req.query;
  const query = {};

  if (role) query.role = role;
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ];
  }

  const users = await User.find(query).select("-password").sort({ createdAt: -1 });
  return res.json({ users });
};

export const listRequests = async (req, res) => {
  const { status, category } = req.query;
  const query = {};
  if (status) query.status = status;
  if (category) query.category = category;

  const requests = await HelpRequest.find(query)
    .populate("needy", "name email phone verificationDetails")
    .sort({ createdAt: -1 });

  return res.json({ requests });
};

export const reviewRequest = async (req, res) => {
  const { requestId } = req.params;
  const { status, adminNote } = req.body;

  const request = await HelpRequest.findById(requestId);
  if (!request) {
    return res.status(404).json({ message: "Request not found" });
  }

  request.status = status;
  request.adminNote = adminNote;
  if (status === "fulfilled") {
    request.resolvedAt = new Date();
  }
  await request.save();

  return res.json({ message: "Request status updated", request });
};

export const assignDonation = async (req, res) => {
  const { donationId, helpRequestId, note } = req.body;

  if (!mongoose.Types.ObjectId.isValid(donationId) || !mongoose.Types.ObjectId.isValid(helpRequestId)) {
    return res.status(400).json({ message: "Invalid IDs" });
  }

  const donation = await Donation.findById(donationId);
  const request = await HelpRequest.findById(helpRequestId);

  if (!donation || !request) {
    return res.status(404).json({ message: "Donation or request not found" });
  }

  donation.status = "assigned";
  donation.impactMessage = `Assigned to request: ${request.title}`;
  await donation.save();

  request.status = "fulfilled";
  request.resolvedAt = new Date();
  await request.save();

  const assignment = await Assignment.create({
    donation: donation._id,
    helpRequest: request._id,
    assignedBy: req.user._id,
    note,
    completed: true,
  });

  return res.status(201).json({ message: "Donation assigned successfully", assignment });
};

export const listDonations = async (req, res) => {
  const { category, status, search } = req.query;
  const query = {};

  if (category) query.category = category;
  if (status) query.status = status;

  const donations = await Donation.find(query)
    .populate("donor", "name email")
    .sort({ createdAt: -1 });

  const filtered = search
    ? donations.filter(
        (d) =>
          d.description.toLowerCase().includes(search.toLowerCase()) ||
          d.donor?.name?.toLowerCase().includes(search.toLowerCase())
      )
    : donations;

  return res.json({ donations: filtered });
};
