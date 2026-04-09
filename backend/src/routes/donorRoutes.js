import express from "express";
import { createDonation, myDonations } from "../controllers/donorController.js";
import { createOrder, verifyPayment } from "../controllers/paymentController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";
import { ROLES } from "../constants/index.js";

const router = express.Router();

router.use(protect, authorize(ROLES.DONOR));

router.post("/donations", createDonation);
router.get("/donations", myDonations);
router.post("/payments/order", createOrder);
router.post("/payments/verify", verifyPayment);

export default router;
