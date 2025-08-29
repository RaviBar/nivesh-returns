import mongoose from "mongoose";

const MONGO_URI = "mongodb+srv://ravibaraskar108:cl1FY1jM3LRtChh6@cluster0.jdksxeb.mongodb.net/nivesh-returns"; // Replace with your actual connection string

export function connectDB() {
  mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));
}