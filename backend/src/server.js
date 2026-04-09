import dotenv from "dotenv";
import app from "./app.js";
import { connectDB } from "./config/db.js";
import { ensureUploadsDir } from "./utils/ensureUploadsDir.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const bootstrap = async () => {
  ensureUploadsDir();
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

bootstrap();
