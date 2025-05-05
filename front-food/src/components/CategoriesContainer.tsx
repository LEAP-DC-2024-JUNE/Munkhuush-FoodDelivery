"use client";

import { useEffect, useState } from "react";
import { Categories } from "./Categories";
import { Foodcontainer } from "./FoodContainer";

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

export const CategoriesContainer = () => {
  const [foodCategories, setFoodCategories] = useState<FoodCategory[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/food-categories/test-aggregate`
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
    <>
      <Categories
        foodCategories={foodCategories}
        selectedCategoryId={selectedCategoryId}
        setSelectedCategoryId={setSelectedCategoryId}
      />
      <Foodcontainer
        foodCategories={foodCategories}
        selectedCategoryId={selectedCategoryId}
      />
    </>
  );
};
