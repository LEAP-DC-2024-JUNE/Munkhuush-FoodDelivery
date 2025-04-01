import FoodCategory from "../models/foodCategoryModel.js";

export const addCategory = async (req, res) => {
  const { categoryName } = req.body;

  try {
    // Check if category already exists
    const categoryExists = await FoodCategory.findOne({ categoryName });
    if (categoryExists) {
      return res.status(400).json({ error: "Category already exists" });
    }

    const newCategory = new FoodCategory({
      categoryName,
    });

    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(500).json({ error: "Failed to add category." });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await FoodCategory.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch categories." });
  }
};

export const updateCategories = async (req, res) => {
  const { id } = req.params;
  const { categoryName } = req.body;

  try {
    const foodCategory = await FoodCategory.findByIdAndUpdate(id, req.body);
    if (!foodCategory) {
      res.status(400).json({ error: "The category was not found!" });
    }

    res.status(200).json(foodCategory);
  } catch (error) {
    res.status(500).json({ error: "Failed to update category." });
  }
};

export const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCategory = await FoodCategory.findByIdAndDelete(id);
    if (!deletedCategory) {
      res.status(400).json({ error: "The category was not found!" });
    }
    res.status(200).json({ message: "Successfully deleted the category!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete the category" });
  }
};
