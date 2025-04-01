import express from "express";
import {
  createFood,
  deleteFood,
  getAllFoods,
  updateFood,
} from "../controllers/foodController.js";

const router = express.Router();

router.post("/", createFood);
router.get("/", getAllFoods);
router.patch("/:id", updateFood);
router.delete("/:id", deleteFood);

export default router;
