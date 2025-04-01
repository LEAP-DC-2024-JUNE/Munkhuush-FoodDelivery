import mongoose from "mongoose";

const foodOrderItemSchema = new mongoose.Schema({
  food: { type: mongoose.Schema.Types.ObjectId, ref: "Food", required: true },
  quantity: { type: Number, required: true, min: 1 },
});

export default mongoose.model("FoodOrderItem", foodOrderItemSchema);
