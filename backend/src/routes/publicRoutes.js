import express from "express";

const router = express.Router();

router.get("/health", (_, res) => {
  res.json({ status: "ok", service: "ngo-management-api" });
});

export default router;
