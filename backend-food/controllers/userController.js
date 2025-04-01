import userModel from "../models/userModel.js";

export const createUser = async (req, res) => {
  const { email, password, phoneNumber, address, role } = req.body;
  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }
    const newUser = await userModel.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to create an user!" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users!" });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedUser = await userModel.findByIdAndUpdate(id, req.body);

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: "Failed to update user" });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await userModel.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
  }
};
