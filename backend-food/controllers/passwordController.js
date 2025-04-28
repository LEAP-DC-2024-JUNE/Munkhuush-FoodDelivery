import crypto from "crypto";
import User from "../models/userModel.js";
import { sendEmail } from "../utils/sendEmail.js";
import bcrypt from "bcryptjs";

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(404)
      .json({ message: "No account with that email found." });
  }

  const resetToken = crypto.randomBytes(20).toString("hex");
  const hashed = crypto.createHash("sha256").update(resetToken).digest("hex");

  user.passwordResetToken = hashed;
  user.passwordResetExpires = Date.now() + 60 * 60 * 1000; // 1 hour
  await user.save({ validateBeforeSave: false });

  const resetURL = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

  const html = `
    <p>You requested a password reset. Click here:</p>
    <a href="${resetURL}">${resetURL}</a>
    <p>If you didn’t request this, ignore this email.</p>
  `;

  try {
    await sendEmail(user.email, "Password Reset", html);
    res.status(200).json({ message: "Reset link sent to email." });
  } catch (err) {
    console.error(err);

    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    res.status(500).json({ message: "Error sending reset email." });
  }
};

export const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  const hashed = crypto.createHash("sha256").update(token).digest("hex");
  const hashedPassword = await bcrypt.hash(newPassword, 12);

  const user = await User.findOne({
    passwordResetToken: hashed,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) {
    return res.status(400).json({ message: "Token invalid or expired." });
  }

  user.password = hashedPassword;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  res.status(200).json({ message: "Password successfully reset." });
};
