import FoodOrder from "../models/foodOrderModel.js";

export const createFoodOrder = async (req, res) => {
  const { user, foodOrderItems, totalPrice, status } = req.body;

  try {
    const newOrder = await FoodOrder.create({
      user,
      foodOrderItems,
      totalPrice,
      status,
    });

    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ error: "Failed to create order." });
  }
};

export const getFoodOrders = async (req, res) => {
  try {
    const orders = await FoodOrder.find()
      .populate("user")
      .populate({
        path: "foodOrderItems",
        populate: { path: "food", select: "foodName price" }, // Populate food details inside foodOrderItems
      });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders." });
  }
};

export const getFoodOrderById = async (req, res) => {
  try {
    const order = await FoodOrder.findById(req.params.id)
      .populate("user")
      .populate({
        path: "foodOrderItems",
        populate: { path: "food", select: "foodName price" }, // Populate food details inside foodOrderItems
      });

    if (!order) return res.status(404).json({ error: "Order not found." });

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch order." });
  }
};

export const updateFoodOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedOrder = await FoodOrder.findByIdAndUpdate(id, req.body)
      .populate("user")
      .populate({
        path: "foodOrderItems",
        populate: { path: "food", select: "foodName price" }, // Populate food details inside foodOrderItems
      });

    if (!updatedOrder)
      return res.status(404).json({ error: "Order not found." });

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: "Failed to update order." });
  }
};

export const deleteFoodOrder = async (req, res) => {
  try {
    const deletedOrder = await FoodOrder.findByIdAndDelete(req.params.id);
    if (!deletedOrder)
      return res.status(404).json({ error: "Order not found." });

    res.status(200).json({ message: "Order deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete order." });
  }
};
