import mongoose from "mongoose";

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
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  { timestamps: true }
);

// userSchema.pre("save", async function () {
//   this.password = await bcrypt.hash(this.password, 12);
// });  <--- wrong method, move it to the controller

export default mongoose.model("User", userSchema);
