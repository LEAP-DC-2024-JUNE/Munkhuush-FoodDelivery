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

  const handleFile = (e) => {
    console.log(e);

    setNewFood({ ...newFood, image: e.target.files[0] });
  };
  console.log(newFood);

  const uploadImage = async () => {
    const UPLOAD_PRESET = "food_preset";
    const CLOUD_NAME = "dyih7skpb";
    const newFormData = new FormData();
    newFormData.append("file", newFood.image);
    newFormData.append("upload_preset", UPLOAD_PRESET);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      { method: "POST", body: newFormData }
    );
    const result = await response.json();
    return result.secure_url;
  };

  const handleAddFood = async (categoryId: string) => {
    const imageUrl = await uploadImage();
    if (!newFood?.foodName || !newFood.price || !newFood.image) {
      alert("Please fill all fields and upload an image.");
      return;
    }
    console.log(imageUrl);

    console.log("daragdlaa");
    const res = await fetch("http://localhost:3001/api/foods", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...newFood,
        category: categoryId,
        image: imageUrl,
      }),
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    categoryId: string
  ) => {
    const { name, value } = e.target;
    setNewFood((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) || "" : value,
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
                  value={newFood.foodName}
                  onChange={(e) => handleChange(e, category._id)}
                  name="foodName"
                />
                <input
                  className="border"
                  type="text"
                  placeholder="Price"
                  value={newFood.price}
                  onChange={(e) => handleChange(e, category._id)}
                  name="price"
                />
                <input
                  className="border"
                  type="file"
                  placeholder="Image url"
                  onChange={(e) => handleFile(e)}
                  name="image"
                />
                <input
                  className="border"
                  type="text"
                  placeholder="Ingredients"
                  name="ingredients"
                  value={newFood.ingredients}
                  onChange={(e) => handleChange(e, category._id)}
                />
                {/* <input
                  className="border"
                  type="text"
                  placeholder="Category"
                  name="category"
                  value={category._id}
                  onChange={(e) => handleChange(e, category._id)}
                /> */}
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
