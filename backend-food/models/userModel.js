import mongoose from "mongoose";

const UserRoleEnum = {
  USER: "USER",
  ADMIN: "ADMIN",
};

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    address: { type: String, required: true },
    role: { type: String, enum: Object.values(UserRoleEnum), default: "USER" },
    orderedFoods: [{ type: mongoose.Schema.Types.ObjectId, ref: "FoodOrder" }],
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
