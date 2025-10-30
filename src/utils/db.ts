import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mystring";

export const connectDB = async() => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MonogDB connected");
  } catch (err) {
    console.log("MongoDB connection error:", err);
    process.exit(1);
  }
}