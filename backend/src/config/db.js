import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let memoryServer;

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    console.log("Trying in-memory MongoDB fallback for local development...");

    try {
      memoryServer = await MongoMemoryServer.create({
        binary: {
          downloadDir: process.env.MONGOMS_DOWNLOAD_DIR || "D:/mongodb-binaries",
          skipMD5: true,
        },
      });

      const memoryUri = memoryServer.getUri();
      const conn = await mongoose.connect(memoryUri);
      console.log(`In-memory MongoDB connected: ${conn.connection.host}`);
    } catch (memoryError) {
      console.error("In-memory MongoDB setup failed:", memoryError.message);
      console.log(
        "\n⚠️  MongoDB is not available. Please do one of the following:\n"
      );
      console.log("Option 1: Install MongoDB Community Edition locally");
      console.log("         https://www.mongodb.com/try/download/community\n");
      console.log("Option 2: Use MongoDB Atlas (Cloud)");
      console.log("         https://www.mongodb.com/cloud/atlas\n");
      console.log("Option 3: Use Docker to run MongoDB:");
      console.log(
        "         docker run --name mongodb -d -p 27017:27017 mongo\n"
      );
      process.exit(1);
    }
  }
};
