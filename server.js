import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import logger from './utils/logger.js';
import UserRoutes from "./routes/UserRoutes.js";
import path from "path";
dotenv.config();
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use(cors());
app.use(express.json());
app.use("/user", UserRoutes);
app.use(
  "/api/uploads",
  express.static(path.join(__dirname, "Public", "uploads"))
);

app.get('/health', (req, res) => {
  const status = mongoose.connection.readyState === 1 ? 'ok' : 'disconnected';
  res.status(200).json({ status, env: process.env.NODE_ENV || 'development' });
});

const PORT = process.env.PORT || 8050;

const start = async () => {
  try {
    if (!process.env.MONGO_URI) {
      logger.error("MONGO_URI is not defined in environment");
      process.exit(1);
    }
    await mongoose.connect(process.env.MONGO_URI);
    logger.info("Connected to DB");
    app.listen(PORT, () => {
      logger.info(`Listening on PORT ${PORT}`);
    });
  } catch (error) {
    logger.error("Failed to start server:", error);
    process.exit(1);
  }
};

start();
