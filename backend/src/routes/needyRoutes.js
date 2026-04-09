import express from "express";
import { createHelpRequest, myRequests } from "../controllers/needyController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";
import { ROLES } from "../constants/index.js";
import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.use(protect, authorize(ROLES.NEEDY));

router.post("/requests", upload.single("verificationDocument"), createHelpRequest);
router.get("/requests", myRequests);

export default router;
