import mongoose from "mongoose";

const FoodOrderStatusEnum = {
  PENDING: "PENDING",
  CANCELED: "CANCELED",
  DELIVERED: "DELIVERED",
};

const foodOrderItemSchema = new mongoose.Schema({
  food: { type: mongoose.Schema.Types.ObjectId, ref: "Food", required: true },
  quantity: { type: Number, required: true, min: 1 },
});

const foodOrderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    totalPrice: { type: Number, required: true, min: 0 },
    foodOrderItems: { type: [foodOrderItemSchema], required: true },
    status: {
      type: String,
      enum: Object.values(FoodOrderStatusEnum),
      default: "PENDING",
    },
  },
  { timestamps: true }
);

export default mongoose.model("FoodOrder", foodOrderSchema);
