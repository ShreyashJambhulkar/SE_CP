import crypto from "crypto";
import { getRazorpayClient } from "../config/razorpay.js";
import { Donation } from "../models/Donation.js";
import { Transaction } from "../models/Transaction.js";

export const createOrder = async (req, res) => {
  try {
    const { donationId } = req.body;

    const donation = await Donation.findOne({ _id: donationId, donor: req.user._id });
    if (!donation) {
      return res.status(404).json({ message: "Donation not found" });
    }

    if (donation.category !== "money") {
      return res.status(400).json({ message: "Razorpay supports money donations only" });
    }

    const amountInPaise = Math.round(donation.amount * 100);

    const razorpay = getRazorpayClient();
    const order = await razorpay.orders.create({
      amount: amountInPaise,
      currency: "INR",
      receipt: `ngo-${donation._id}`,
      notes: {
        donorId: req.user._id.toString(),
        donationId: donation._id.toString(),
      },
    });

    await Transaction.create({
      donation: donation._id,
      donor: req.user._id,
      razorpayOrderId: order.id,
      amount: donation.amount,
      paymentStatus: "created",
    });

    return res.status(201).json({
      order,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    return res.status(400).json({
      message:
        error.message ||
        "Unable to create Razorpay order. Check Razorpay key configuration.",
    });
  }
};

export const verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, donationId } = req.body;

  const generated = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (generated !== razorpay_signature) {
    return res.status(400).json({ message: "Payment verification failed" });
  }

  await Transaction.findOneAndUpdate(
    { razorpayOrderId: razorpay_order_id },
    {
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature,
      paymentStatus: "captured",
    }
  );

  await Donation.findByIdAndUpdate(donationId, { status: "paid" });

  return res.json({ message: "Payment successful and verified" });
};
