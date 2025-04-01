"use client";
import GroupedCategories from "@/components/GroupedCategories";
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

const foodMenu = () => {
  const [foodCategories, setFoodCategories] = useState<FoodCategory[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [isOpen, setIsOpen] = useState(false);

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

  const handleAddCategory = async () => {
    const res = await fetch("http://localhost:3001/api/food-categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ categoryName: newCategory }),
    });

    const addedCategory = await res.json();
    setFoodCategories([...foodCategories, addedCategory]);
    setNewCategory("");
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col gap-10">
      <h1 className="font-semibold text-2xl">Dishes category</h1>
      <div className="flex gap-5">
        <button className="border rounded-xl px-2">All dishes</button>
        {foodCategories.map((category) => {
          return (
            <span key={category._id} className="border px-2 rounded-xl">
              {category.categoryName}
            </span>
          );
        })}
        <button
          onClick={() => setIsOpen(true)}
          className="border bg-red-400 rounded-md px-2 text-white"
        >
          Add a category
        </button>
        {isOpen == true ? (
          <div className=" ">
            <input
              placeholder="New category"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="border"
              type="text"
            />
            <button
              onClick={handleAddCategory}
              className="bg-green-500 px-2 rounded-2xl text-white"
            >
              Add
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
      <GroupedCategories />
    </div>
  );
};

export default foodMenu;
