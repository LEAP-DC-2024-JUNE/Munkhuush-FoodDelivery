export type StoredFoodItem = {
  _id: string;
  foodName: string;
  image: string;
  ingredients: string;
  price: number;
  quantity: number;
  totalPrice: number;
};

export type FoodOrderItem = {
  foodId: string;
  foodName: string;
  quantity: number;
};

export type OrderedFood = {
  _id: string;
  userId: string;
  foodOrderItems: FoodOrderItem[];
  totalPrice: number;
  status: string;
  createdAt: string;
  userAddress: string;
};
