import "express-async-errors";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import authRoutes from "./routes/authRoutes.js";
import donorRoutes from "./routes/donorRoutes.js";
import needyRoutes from "./routes/needyRoutes.js";
import volunteerRoutes from "./routes/volunteerRoutes.js";
import publicRoutes from "./routes/publicRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

const app = express();

const allowedOrigins = (
  process.env.FRONTEND_URL || "http://localhost:5173,http://localhost:5174"
)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests without origin (e.g., Postman/server-to-server)
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

app.use("/api/public", publicRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/donor", donorRoutes);
app.use("/api/needy", needyRoutes);
app.use("/api/volunteer", volunteerRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
