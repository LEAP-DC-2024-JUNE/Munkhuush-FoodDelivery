"use client";

import { useEffect, useState } from "react";
import { AdminAddCategory } from "./AdminAddCategory";

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

const AdminCategories = () => {
  const [foodCategories, setFoodCategories] = useState<FoodCategory[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/api/food-categories"
        );
        const data: FoodCategory[] = await response.json();
        setFoodCategories(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const response = await fetch(
  //           "http://localhost:3001/api/food-categories/test-aggregate"
  //         );
  //         const data: FoodCategory[] = await response.json();
  //         setFoodCategories(data);
  //         console.log(data);
  //       } catch (error) {
  //         console.error("Error fetching data:", error);
  //       }
  //     };

  //     fetchData();
  //   }, []);

  return (
    <div className="flex flex-col gap-4  rounded-xl p-6  bg-white ">
      <h1 className="font-semibold text-xl">Dishes category</h1>
      <div className="flex gap-3 flex-wrap">
        <button className="border border-red-500 rounded-full px-4 py-2 text-sm font-medium">
          All dishes
          {/* <span>
            {foodCategories.reduce(
              (acc, category) => acc + category.foods.length,
              0
            )}
          </span> */}
        </button>
        {foodCategories.map((category) => {
          return (
            <span
              key={category._id}
              className="border px-4 py-2 rounded-full text-sm font-medium"
            >
              {category.categoryName}
            </span>
          );
        })}
        <AdminAddCategory
          setFoodCategories={setFoodCategories}
          foodCategories={foodCategories}
        />
      </div>
    </div>
  );
};

export default AdminCategories;
