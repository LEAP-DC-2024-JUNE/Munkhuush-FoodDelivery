import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001",
});

export const signup = async (data) => {
  const response = await api.post("/api/food-delivery/signup", data);
  return response.data;
};

export const login = async (data) => {
  const response = await api.post("/api/food-delivery/login", data);
  return response.data;
};

export const checkoutOrder = async (userId, foodItems, totalPrice) => {
  try {
    const response = await api.post("/api/food-orders", {
      user: userId,
      totalPrice,
      foodOrderItems: foodItems.map((item) => ({
        food: item._id,
        quantity: item.quantity,
      })),
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Unexpected error" };
  }
};
