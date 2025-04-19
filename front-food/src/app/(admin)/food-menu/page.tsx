"use client";

import AdminCategories from "@/components/AdminCategories";
import { AdminFoodMenu } from "@/components/AdminFoodMenu";
import { AdminSideBar } from "@/components/AdminSideBar";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface MyJwtPayload {
  id: string;
  role: string;
}

const foodMenu = () => {
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

  if (loading) {
    return <div className="p-4">Loading...</div>;
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
        <AdminCategories />
        <AdminFoodMenu />
      </div>
    </div>
  );
};

export default foodMenu;
