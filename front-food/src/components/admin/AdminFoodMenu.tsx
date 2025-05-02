"use client";

import { useEffect, useState } from "react";
import { AdminFoodCard } from "./AdminFoodCart";
import { AdminAddFood } from "./AdminAddFood";

interface FoodItem {
  _id: string;
  foodName: string;
  price: number;
  ingredients: string;
  image: string;
  category: string;
}

export interface FoodCategory {
  _id: string;
  categoryName: string;

  foods: FoodItem[];
}

export const AdminFoodMenu = () => {
  const [foodCategories, setFoodCategories] = useState<FoodCategory[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/food-categories/test-aggregate`
        );
        const data: FoodCategory[] = await response.json();
        setFoodCategories(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [isOpen]);

  return (
    <div>
      {foodCategories.length > 0 ? (
        foodCategories.map((category) => {
          return (
            <div
              key={category._id}
              className="p-5  rounded-xl bg-white flex flex-col gap-4"
            >
              <h1 className="text-xl font-semibold">
                {category.categoryName} ({category.foods.length})
              </h1>
              <div className="flex flex-wrap gap-4">
                <AdminAddFood
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                  categoryName={category.categoryName}
                  categoryId={category._id}
                />
                {category.foods.map((food) => {
                  return (
                    <AdminFoodCard
                      isOpen={isOpen}
                      setIsOpen={setIsOpen}
                      key={food._id}
                      cardData={food}
                      categoryName={category.categoryName}
                      categoryId={category._id}
                    />
                  );
                })}
              </div>
            </div>
          );
        })
      ) : (
        <p>Loading categories...</p>
      )}
    </div>
  );
};
