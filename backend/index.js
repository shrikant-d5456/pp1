import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRouter from "./routes/Auth.js";
import userRouter from "./routes/User.js";
import postRouter from "./routes/Post.js";
import commentRouter from "./routes/Comment.js";
import medicineRoutes from "./routes/Verification.js";
import adminRoutes from "./routes/Admin.js";
import fileRoutes from "./routes/fileRoutes.js";
import TextSummury from './routes/TextSummury.js'
import Translate from './routes/Translate.js'


const app = express();
// Middleware
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
  })
);

// API Routes
app.use("/auth/api", authRouter);
app.use("/auth/user", userRouter);
app.use("/auth/post", postRouter);
app.use("/auth/comment", commentRouter);
app.use("/auth/api/post", medicineRoutes);
app.use("/auth/api", adminRoutes);
app.use("/api/files", fileRoutes);
app.use('/api/summary',TextSummury);
app.use('/api/translate',Translate );
// MongoDB Connection and Server Start
const PORT = process.env.PORT || 8000;
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

export default app;