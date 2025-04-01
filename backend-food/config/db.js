import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB successfully!");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1); // Exit the app on failure
  }
};

export default connectDB;
