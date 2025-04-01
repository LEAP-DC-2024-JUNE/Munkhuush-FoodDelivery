import FoodOrderItem from "../models/foodOrderItemModel.js";

export const createFoodOrderItem = async (req, res) => {
  const { food, quantity } = req.body;

  try {
    const newOrderItem = await FoodOrderItem.create({ food, quantity });
    res.status(201).json(newOrderItem);
  } catch (error) {
    res.status(500).json({ error: "Failed to create order item." });
  }
};

export const getFoodOrderItems = async (req, res) => {
  try {
    const orderItems = await FoodOrderItem.find().populate("food");
    res.status(200).json(orderItems);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch order items." });
  }
};

export const getFoodOrderItemById = async (req, res) => {
  try {
    const orderItem = await FoodOrderItem.findById(req.params.id).populate(
      "food"
    );
    if (!orderItem)
      return res.status(404).json({ error: "Order item not found." });

    res.status(200).json(orderItem);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch order item." });
  }
};

export const updateFoodOrderItem = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedOrderItem = await FoodOrderItem.findByIdAndUpdate(
      id,
      req.body
    );
    res.status(200).json(updatedOrderItem);
  } catch (error) {
    res.status(500).json({ error: "Failed to update order item." });
  }
};

export const deleteFoodOrderItem = async (req, res) => {
  try {
    const deletedOrderItem = await FoodOrderItem.findByIdAndDelete(
      req.params.id
    );
    if (!deletedOrderItem)
      return res.status(404).json({ error: "Order item not found." });

    res.status(200).json({ message: "Order item deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete order item." });
  }
};
