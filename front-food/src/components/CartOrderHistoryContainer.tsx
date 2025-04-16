"use client";
import { useEffect, useState } from "react";
import { CartOrderHistoryCard } from "./CartOrderHistoryCard";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

export const CartOrderHistoryContainer = ({
  closeSheet,
}: {
  closeSheet: () => void;
}) => {
  const [orderedFood, setOrderedFood] = useState([]);
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.warn("No token found in localStorage");
          return;
        }
        const decoded: any = jwtDecode(token);
        console.log(decoded);
        const response = await fetch("http://localhost:3001/api/food-orders");
        const data = await response.json();
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
