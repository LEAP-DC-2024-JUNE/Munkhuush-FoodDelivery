"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import { AdminDeleteFood } from "./AdminDeleteFood";

type AdminAddFoodProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  cardData: NewFood & { _id: string };
  categoryName: string;
};

type NewFood = {
  foodName: string;
  price: number;
  category: string;
  ingredients: string;
  image: string | File;
};

export interface FoodCategory {
  _id: string;
  categoryName: string;
  foods: NewFood[];
}

export function AdminEditFood({
  isOpen,
  setIsOpen,
  cardData,
  categoryName,
}: AdminAddFoodProps) {
  const [newFood, setNewFood] = useState<NewFood>({
    foodName: cardData.foodName,
    price: cardData.price,
    image: cardData.image,
    ingredients: cardData.ingredients,
    category: cardData.category,
  });
  const [previewImage, setPreviewImage] = useState<string | null>(
    typeof cardData.image === "string" ? cardData.image : null
  );
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categoryId, setCategoryId] = useState(cardData.category);
  const [foodCategories, setFoodCategories] = useState<FoodCategory[]>([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (isOpen) {
      setNewFood({
        foodName: cardData.foodName,
        price: cardData.price,
        image: cardData.image,
        ingredients: cardData.ingredients,
        category: cardData.category,
      });
      setPreviewImage(
        typeof cardData.image === "string" ? cardData.image : null
      );
      setCategoryId(cardData.category);
    }
  }, [isOpen, cardData]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/food-categories`
        );
        const data: FoodCategory[] = await response.json();
        setFoodCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      setNewFood({ ...newFood, image: file });
    }
  };

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

  const handleAddFood = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    let imageUrl = typeof newFood.image === "string" ? newFood.image : "";
    if (newFood.image instanceof File) {
      imageUrl = await uploadImage();
    }

    if (!newFood.foodName || !newFood.price || !imageUrl) {
      alert("Please fill all fields and upload an image.");
      setIsSubmitting(false);
      return;
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/foods/${cardData._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...newFood,
          category: categoryId,
          image: imageUrl,
        }),
      }
    );

    if (res.ok) {
      toast("The dish has been updated.");
      setOpen(false);
      setIsOpen((prev) => !prev);
    }
    setIsSubmitting(false);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setNewFood((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) || "" : value,
    }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <img src="./icons/admin/adminFoodEdit.svg" alt="edit" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Dish Info</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Dish Name */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="foodName" className="text-right">
              Dish name
            </Label>
            <input
              id="foodName"
              name="foodName"
              type="text"
              value={newFood.foodName}
              onChange={handleChange}
              className="col-span-3 border rounded-md p-1"
            />
          </div>

          {/* Dish Category */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="categories" className="text-right">
              Category
            </Label>
            <select
              id="categories"
              name="category"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="col-span-3 border rounded-md p-1"
            >
              {/* {foodCategories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.categoryName}
                </option>
              ))} */}
              {!foodCategories.find((c) => c._id === categoryId) && (
                <option value={categoryId}>{categoryName}</option>
              )}
              {foodCategories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.categoryName}
                </option>
              ))}
            </select>
          </div>

          {/* Price */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Price
            </Label>
            <input
              id="price"
              name="price"
              type="text"
              value={newFood.price}
              onChange={handleChange}
              className="col-span-3 border rounded-md p-1"
            />
          </div>

          {/* Ingredients */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="ingredients" className="text-right">
              Ingredients
            </Label>
            <textarea
              id="ingredients"
              name="ingredients"
              value={newFood.ingredients}
              onChange={handleChange}
              className="col-span-3 border rounded-md p-2 h-[80px] text-sm resize-none"
              placeholder="Enter ingredients..."
            />
          </div>

          {/* Image Upload */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="image" className="text-right">
              Image
            </Label>
            <input
              id="image"
              name="image"
              type="file"
              onChange={handleFile}
              className="col-span-3"
            />
          </div>

          {previewImage && (
            <div className="mt-4">
              <img
                src={previewImage}
                alt="Preview"
                className="max-h-48 rounded-md mx-auto"
              />
            </div>
          )}
        </div>

        <DialogFooter className="flex !justify-between">
          <AdminDeleteFood
            onDelete={() => {
              setOpen(false); // close dialog
              setIsOpen((prev) => !prev); // trigger re-fetch of foods
            }}
            foodId={cardData._id}
          />
          <Button onClick={handleAddFood} disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
