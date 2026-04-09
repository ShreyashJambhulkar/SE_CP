import fs from "fs";

export const ensureUploadsDir = () => {
  if (!fs.existsSync("uploads")) {
    fs.mkdirSync("uploads");
  }
};
