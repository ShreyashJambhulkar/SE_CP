import { HelpRequest } from "../models/HelpRequest.js";

export const createHelpRequest = async (req, res) => {
  const { category, title, details, urgency } = req.body;

  const helpRequest = await HelpRequest.create({
    needy: req.user._id,
    category,
    title,
    details,
    urgency,
    verificationDocument: req.file ? req.file.path : undefined,
  });

  return res.status(201).json({ message: "Request submitted", helpRequest });
};

export const myRequests = async (req, res) => {
  const requests = await HelpRequest.find({ needy: req.user._id }).sort({ createdAt: -1 });
  return res.json({ requests });
};
