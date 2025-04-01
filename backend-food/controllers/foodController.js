import Food from "../models/foodModel.js";

export const createFood = async (req, res) => {
  const { foodName, price, image, ingredients, category } = req.body;

  try {
    const newFood = new Food({
      foodName,
      price,
      image,
      ingredients,
      category,
    });

    const savedFood = await newFood.save();
    res.status(201).json(savedFood);
  } catch (error) {
    res.status(500).json({ error: "Failed to add food item." });
  }
};

export const getAllFoods = async (req, res) => {
  try {
    const foods = await Food.find().populate("category");
    res.status(200).json(foods);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch food items." });
  }
};

export const updateFood = async (req, res) => {
  const { id } = req.params;

  try {
    const food = await Food.findByIdAndUpdate(id, req.body);

    res.status(200).json(food);
  } catch (error) {
    res.status(500).json({ error: "Failed to update the food." });
  }
};

export const deleteFood = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedFood = await Food.findByIdAndDelete(id);
    res.status(200).json({ message: "Successfully deleted the food!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete the food" });
  }
};
