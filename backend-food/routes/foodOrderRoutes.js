import express from "express";
import {
  createFoodOrder,
  getFoodOrders,
  getFoodOrderById,
  updateFoodOrder,
  deleteFoodOrder,
  getFoodOrdersByUserId,
} from "../controllers/foodOrderController.js";
import { authorization } from "../authorization/authorization.js";
import { authentication } from "../authorization/authentication.js";

const router = express.Router();

router.post("/", createFoodOrder);
router.route("/:id").get(authentication, getFoodOrdersByUserId);
router.get("/:id", getFoodOrderById);
router.patch("/:id", updateFoodOrder);
router.delete("/:id", deleteFoodOrder);

router.route("/").get(authentication, authorization("ADMIN"), getFoodOrders);

export default router;
