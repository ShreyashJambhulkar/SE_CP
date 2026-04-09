import express from "express";
import {
  assignDonation,
  dashboardStats,
  listDonations,
  listRequests,
  listUsers,
  reviewRequest,
} from "../controllers/volunteerController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";
import { ROLES } from "../constants/index.js";

const router = express.Router();

router.use(protect, authorize(ROLES.VOLUNTEER));

router.get("/dashboard", dashboardStats);
router.get("/users", listUsers);
router.get("/requests", listRequests);
router.patch("/requests/:requestId/review", reviewRequest);
router.get("/donations", listDonations);
router.post("/assignments", assignDonation);

export default router;
