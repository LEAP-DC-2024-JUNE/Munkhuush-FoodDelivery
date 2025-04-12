"use client";

import AdminCategories from "@/components/AdminCategories";
import { AdminFoodMenu } from "@/components/AdminFoodMenu";
import { AdminSideBar } from "@/components/AdminSideBar";

const foodMenu = () => {
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
