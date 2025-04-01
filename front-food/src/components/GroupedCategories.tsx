"use client";
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

export default function GroupedCategories() {
  const [foodCategories, setFoodCategories] = useState<FoodCategory[]>([]);
  //   const [newFood, setNewFood] = useState({
  //     foodName: "",
  //     price: "",
  //     image: "",
  //     ingredients: "",
  //     category: "",
  //   });
  const [newFood, setNewFood] = useState<{ [key: string]: any }>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/api/food-categories/test-aggregate"
        );
        const data: FoodCategory[] = await response.json();
        setFoodCategories(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleAddFood = async (categoryId: string) => {
    const newAddedFood = newFood[categoryId];
    console.log("daragdlaa");
    const res = await fetch("http://localhost:3001/api/foods", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...newAddedFood, category: categoryId }),
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    categoryId: string
  ) => {
    const { name, value } = e.target;
    setNewFood((prev) => ({
      ...prev,
      [categoryId]: {
        ...prev[categoryId],
        [name]: name === "price" ? Number(value) || "" : value,
      },
    }));
  };
  return (
    <div>
      <div className="flex flex-col gap-20">
        {foodCategories.length > 0 ? (
          foodCategories.map((category) => (
            <div className="flex  flex-col gap-5" key={category._id}>
              <h1 className="px-4 py-2 bg-blue-500 text-white rounded">
                {category.categoryName}
              </h1>
              <div className="ml-4 flex flex-col gap-4">
                {category.foods.map((food) => (
                  <div key={food._id} className="border w-[400px]">
                    <p className="text-gray-800">{food.foodName}</p>
                    <span>{food.price}</span>
                  </div>
                ))}
              </div>
              <div className="ml-4 flex gap-2">
                <input
                  className="border"
                  type="text"
                  placeholder="Food Name"
                  value={newFood[category._id]?.foodName || ""}
                  onChange={(e) => handleChange(e, category._id)}
                  name="foodName"
                />
                <input
                  className="border"
                  type="text"
                  placeholder="Price"
                  value={newFood[category._id]?.price || ""}
                  onChange={(e) => handleChange(e, category._id)}
                  name="price"
                />
                <input
                  className="border"
                  type="text "
                  placeholder="Image url"
                  value={newFood[category._id]?.image || ""}
                  onChange={(e) => handleChange(e, category._id)}
                  name="image"
                />
                <input
                  className="border"
                  type="text"
                  placeholder="Ingredients"
                  name="ingredients"
                  value={newFood[category._id]?.ingredients || ""}
                  onChange={(e) => handleChange(e, category._id)}
                />
                <input
                  className="border"
                  type="text"
                  placeholder="Category"
                  name="category"
                  value={category._id}
                  onChange={(e) => handleChange(e, category._id)}
                />
                <button
                  onClick={() => handleAddFood(category._id)}
                  className="bg-green-400 px-2 rounded-xl text-white"
                >
                  Add a food
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Loading categories...</p>
        )}
      </div>
    </div>
  );
}
