import express from "express";
import {
  createFoodOrderItem,
  getFoodOrderItems,
  getFoodOrderItemById,
  updateFoodOrderItem,
  deleteFoodOrderItem,
} from "../controllers/foodOrderItemController.js";

const router = express.Router();

router.post("/", createFoodOrderItem);
router.get("/", getFoodOrderItems);
router.get("/:id", getFoodOrderItemById);
router.patch("/:id", updateFoodOrderItem);
router.delete("/:id", deleteFoodOrderItem);

export default router;
