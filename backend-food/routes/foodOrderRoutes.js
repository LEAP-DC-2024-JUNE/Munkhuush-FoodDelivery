import express from "express";
import {
  createFoodOrder,
  getFoodOrders,
  getFoodOrderById,
  updateFoodOrder,
  deleteFoodOrder,
} from "../controllers/foodOrderController.js";

const router = express.Router();

router.post("/", createFoodOrder);
router.get("/", getFoodOrders);
router.get("/:id", getFoodOrderById);
router.patch("/:id", updateFoodOrder);
router.delete("/:id", deleteFoodOrder);

export default router;
