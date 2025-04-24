import express from "express";
import {
  createFood,
  deleteFood,
  getAllFoods,
  updateFood,
} from "../controllers/foodController.js";
import { authentication } from "../authorization/authentication.js";
import { authorization } from "../authorization/authorization.js";

const router = express.Router();

router.route("/").post(authentication, authorization("ADMIN"), createFood);
router.get("/", getAllFoods);
router.patch("/:id", updateFood);
router.delete("/:id", deleteFood);

export default router;
