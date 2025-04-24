import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const authentication = async (req, res, next) => {
  const authHeader = req.headers.authorization?.split(" ")[1];
  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }
  try {
    const decoded = jwt.decode(authHeader);
    const foundUser = await userModel.findById(decoded.id);
    if (!foundUser) {
      return res.status(401).json({ message: "User doesn't exist!" });
    }
    req.user = foundUser;
    next();
  } catch (error) {
    console.warn(error);
  }
};
