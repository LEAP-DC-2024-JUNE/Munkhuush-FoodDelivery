"use client";
import AdminCategories from "@/components/AdminCategories";
import { AdminFoodMenu } from "@/components/AdminFoodMenu";
import { AdminSideBar } from "@/components/AdminSideBar";
import { useEffect, useState } from "react";

interface FoodItem {
  _id: string;
  foodName: string;
  price: number;
}

interface FoodCategory {
  _id: string;
  categoryName: string;
  foods: FoodItem[];
}

export default function Note() {
  const [foodCategories, setFoodCategories] = useState<FoodCategory[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/api/food-categories/test-aggregate"
        );
        const data: FoodCategory[] = await response.json();
        setFoodCategories(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex ">
      {/* <div className="flex flex-col gap-20">
        {foodCategories.length > 0 ? (
          foodCategories.map((category) => (
            <div key={category._id}>
              <h1 className="px-4 py-2 bg-blue-500 text-white rounded">
                {category.categoryName}
              </h1>
              <div className="ml-4">
                {category.foods.map((food) => (
                  <div key={food._id}>
                    <p className="text-gray-800">{food.foodName}</p>
                    <span>{food.price}</span>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p>Loading categories...</p>
        )}
      </div> */}
      <AdminSideBar />
      <div>
        <AdminCategories />
        <AdminFoodMenu />
      </div>
    </div>
  );
}
