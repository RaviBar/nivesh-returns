import dotenv from "dotenv";
dotenv.config({ path: "../.env" });
import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import walletRoutes from "./api/routes/wallet.js";
import authRoutes from "./api/routes/auth.js";
import { connectDB } from "./db.js";
import investmentRoutes from "./api/routes/investment.js";
import paymentRoutes from "./api/routes/paymentRoutes.js";
import { initScheduledJobs } from "./cron/returnsJob.js";

const app = express();

app.use(cors({
    origin: "http://localhost:5173",  
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());
app.use(cookieParser());

// connect DB
connectDB();
app.use("/api/wallet", walletRoutes);
app.use("/api", paymentRoutes);
app.use("/api/investments", investmentRoutes);
app.use("/api/auth", authRoutes);

initScheduledJobs();

app.listen(5000, () => console.log("Server running on port 5000"));
