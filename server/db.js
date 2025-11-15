import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

export function connectDB() {
  mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));
}