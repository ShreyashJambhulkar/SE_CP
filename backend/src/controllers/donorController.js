import { Donation } from "../models/Donation.js";
import { Assignment } from "../models/Assignment.js";

export const createDonation = async (req, res) => {
  const { category, amount, quantity, description } = req.body;

  const donation = await Donation.create({
    donor: req.user._id,
    category,
    amount: Number(amount || 0),
    quantity: Number(quantity || 1),
    description,
    status: category === "money" ? "pledged" : "paid",
  });

  return res.status(201).json({ message: "Donation created", donation });
};

export const myDonations = async (req, res) => {
  const donations = await Donation.find({ donor: req.user._id }).sort({ createdAt: -1 });

  const assignments = await Assignment.find({ donation: { $in: donations.map((d) => d._id) } })
    .populate({ path: "helpRequest", select: "title category status" })
    .lean();

  const impactByDonation = assignments.reduce((acc, assignment) => {
    acc[assignment.donation.toString()] = assignment.helpRequest;
    return acc;
  }, {});

  const enriched = donations.map((donation) => ({
    ...donation.toObject(),
    impact: impactByDonation[donation._id.toString()] || null,
  }));

  return res.json({ donations: enriched });
};
