import express from "express";
import connectDB from "./config/db.js";
import foodRoutes from "./routes/foodRoutes.js";
import foodCategoryRoutes from "./routes/foodCategoryRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import foodOrderRoutes from "./routes/foodOrderRoutes.js";
import foodOrderItemRoutes from "./routes/foodOrderItemRoutes.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = 3001;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/foods", foodRoutes);
app.use("/api/food-categories", foodCategoryRoutes);
app.use("/api/users", userRoutes);
app.use("/api/food-orders", foodOrderRoutes);
app.use("/api/food-order-items", foodOrderItemRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
