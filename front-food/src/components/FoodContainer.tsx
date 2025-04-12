"use client";

import { useEffect, useState } from "react";
import { FoodCard } from "./FoodCard";

interface FoodItem {
  _id: string;
  foodName: string;
  price: number;
  ingredients: string;
  image: string;
}

interface FoodCategory {
  _id: string;
  categoryName: string;
  foods: FoodItem[];
}

export const Foodcontainer = () => {
  const [foodCategories, setFoodCategories] = useState<FoodCategory[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/api/food-categories/test-aggregate"
        );
        const data: FoodCategory[] = await response.json();
        setFoodCategories(data.slice(0, 3));
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="py-12 bg-neutral-700">
      <div className="px-[88px] flex flex-col gap-20 bg-neutral-700">
        {foodCategories.length > 0 ? (
          foodCategories.map((category) => (
            <div key={category._id} className="flex flex-col gap-[54px]">
              <h1 className=" text-white font-semibold text-3xl">
                {category.categoryName}
              </h1>
              <div className=" flex flex-wrap gap-9">
                {category.foods.map((food) => (
                  <div key={food._id}>
                    <FoodCard cardData={food} />
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p>Loading categories...</p>
        )}
      </div>
    </div>
  );
};
