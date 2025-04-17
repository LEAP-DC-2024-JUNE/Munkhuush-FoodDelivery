"use client";
import { useEffect, useState } from "react";
import { CartOrderHistoryCard } from "./CartOrderHistoryCard";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
interface FoodOrderItem {
  foodId: string;
  foodName: string;
  quantity: number;
}

interface OrderedFood {
  _id: string;
  totalPrice: number;
  status: string;
  createdAt: string;
  userAddress: string;
  userId: string;
  foodOrderItems: FoodOrderItem[];
}

interface CartOrderHistoryContainerProps {
  closeSheet: () => void;
}

export const CartOrderHistoryContainer = ({
  closeSheet,
}: CartOrderHistoryContainerProps) => {
  const [orderedFood, setOrderedFood] = useState<OrderedFood[]>([]);
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.warn("No token found in localStorage");
          return;
        }
        const decoded = jwtDecode<{ id: string }>(token);
        console.log(decoded);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/food-orders`
        );
        const data: OrderedFood[] = await response.json();
        const filteredData = data.filter((food) => food.userId === decoded.id);
        setOrderedFood(filteredData);
        console.log(filteredData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleAddFood = () => {
    closeSheet();
    router.push("/");
  };
  return (
    <div className="w-[471px] bg-white p-4 flex flex-col gap-5 rounded-[20px]">
      <h1 className="font-semibold text-xl">Order history</h1>
      {orderedFood.length > 0 ? (
        orderedFood.map((item) => (
          <CartOrderHistoryCard key={item._id} orderedFood={item} />
        ))
      ) : (
        <div className="relative">
          <img src="./noOrders.svg" alt="noOrder" />
          <span className="absolute bottom-[40px] left-[50px] text-2xl ">
            🍕
          </span>
        </div>
      )}
      <button
        onClick={handleAddFood}
        className="text-red-500 w-[439px] h-11 border border-red-500 rounded-full"
      >
        Add food
      </button>
    </div>
  );
};
