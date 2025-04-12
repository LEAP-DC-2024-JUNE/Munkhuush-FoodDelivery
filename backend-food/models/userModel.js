import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserRoleEnum = {
  USER: "USER",
  ADMIN: "ADMIN",
};

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: [true, "Provide your password!"],
      minlength: 8,
      select: false,
    },
    phoneNumber: { type: String, required: true },
    address: { type: String, required: true },
    role: { type: String, enum: Object.values(UserRoleEnum), default: "USER" },
    orderedFoods: [{ type: mongoose.Schema.Types.ObjectId, ref: "FoodOrder" }],
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 12);
});

export default mongoose.model("User", userSchema);
