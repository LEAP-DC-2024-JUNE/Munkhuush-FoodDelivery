import express from "express";
import {
  addCategory,
  getCategories,
} from "../controllers/foodCategoryController.js";
import { updateCategories } from "../controllers/foodCategoryController.js";
import { deleteCategory } from "../controllers/foodCategoryController.js";
import { testAggregate } from "../controllers/testAggregate.js";
import { authentication } from "../authorization/authentication.js";
import { authorization } from "../authorization/authorization.js";

const router = express.Router();

router.route("/").post(authentication, authorization("ADMIN"), addCategory);

router.get("/", getCategories);
router.patch("/:id", updateCategories);
router.delete("/:id", deleteCategory);
router.get("/test-aggregate", testAggregate);

export default router;
