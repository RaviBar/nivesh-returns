import mongoose from "mongoose";

export function connectDB() {
  const MONGO_URI = process.env.MONGO_URI;
  
  if (!MONGO_URI) {
    console.error('ERROR: MONGO_URI environment variable is not set!');
    console.error('Please ensure server/.env file exists with MONGO_URI');
    return;
  }
  
  mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));
}