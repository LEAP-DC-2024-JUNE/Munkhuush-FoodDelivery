"use client";

import AdminCategories from "@/components/admin/AdminCategories";
import { AdminFoodMenu } from "@/components/admin/AdminFoodMenu";
import { AdminSideBar } from "@/components/admin/AdminSideBar";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface MyJwtPayload {
  id: string;
  role: string;
}
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

const foodMenu = () => {
  const [foodCategories, setFoodCategories] = useState<FoodCategory[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [accessDenied, setAccessDenied] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    const decoded = jwtDecode<MyJwtPayload>(token);
    if (decoded.role !== "ADMIN") {
      setAccessDenied(true);
      setLoading(false);
      return;
    } else if (decoded.role == "ADMIN") {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/food-categories/test-aggregate`
      );
      const data = await res.json();
      setFoodCategories(data);
    };
    fetchData();
  }, [isOpen]);

  if (loading) {
    return (
      <div className="flex  ">
        <AdminSideBar />
        <div className="h-screen w-full flex justify-center items-center">
          Loading...
        </div>
      </div>
    );
  }
  if (accessDenied) {
    return (
      <div className="p-4 text-red-500 text-2xl flex flex-col gap-4 justify-center items-center h-screen">
        <h1>Access Denied: Admins only.</h1>
        <button
          onClick={() => router.push("/")}
          className=" text-white px-4 py-2 rounded-full bg-black text-[16px] "
        >
          go back
        </button>
      </div>
    );
  }
  return (
    <div className="flex ">
      <AdminSideBar />
      <div className="p-6 bg-gray-50 flex flex-col gap-6">
        <div className="flex justify-end">
          <img src="./icons/admin/adminProfile.svg" alt="adminlogo" />
        </div>
        <AdminCategories
          foodCategories={foodCategories}
          selectedCategoryId={selectedCategoryId}
          onSelectCategory={setSelectedCategoryId}
        />
        <AdminFoodMenu
          foodCategories={foodCategories}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          selectedCategoryId={selectedCategoryId}
        />
      </div>
    </div>
  );
};

export default foodMenu;
