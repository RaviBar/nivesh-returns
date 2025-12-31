import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import walletRoutes from "./api/routes/wallet.js";
import authRoutes from "./api/routes/auth.js";
import adminRoutes from "./api/routes/admin.js";
import plansRoutes from "./api/routes/plans.js";
import { connectDB } from "./db.js";
import investmentRoutes from "./api/routes/investment.js";
import paymentRoutes from "./api/routes/paymentRoutes.js";
import { initScheduledJobs } from "./cron/returnsJob.js";

const app = express();

const allowedOrigins = (process.env.FRONTEND_ORIGIN || "http://localhost:5173")
  .split(",")
  .map(s => s.trim());

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error(`CORS blocked for origin: ${origin}`), false);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Accept", "X-Requested-With"]
}));

app.use(express.json());
app.use(cookieParser());

// connect DB
connectDB();
app.use("/api/wallet", walletRoutes);
app.use("/api", paymentRoutes);
app.use("/api/investments", investmentRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/plans", plansRoutes);
app.get("/health", (_, res) => res.json({ ok: true }));

initScheduledJobs();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
