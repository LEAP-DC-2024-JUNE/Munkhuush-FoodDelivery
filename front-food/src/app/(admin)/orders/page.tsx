// import { AdminSideBar } from "@/components/AdminSideBar";
// import { FoodOrder, columns } from "./columns";
// import { DataTable } from "./data-table";
// async function getData(): Promise<FoodOrder[]> {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/api/food-orders`,
//     {
//       cache: "no-store",
//     }
//   );

//   if (!res.ok) throw new Error("Failed to fetch orders");
//   const data = await res.json();
//   console.log(data);
//   return data;
// }

// const Orders = async () => {
//   const data = await getData();
//   return (
//     <div className="flex">
//       <AdminSideBar />
//       <DataTable columns={columns} data={data} />
//     </div>
//   );
// };

// export default Orders;

"use client";

import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

import { AdminSideBar } from "@/components/admin/AdminSideBar";
import { DataTable } from "./data-table";
import { getColumns } from "./columns";

interface FoodOrder {
  _id: string;
  id: string;
  email: string;
  status: "pending" | "processing" | "success";
  foodName: string;
  price: number;
  quantity: number;
  totalPrice: number;
  createdAt: string;
}

interface MyJwtPayload {
  id: string;
  role: string;
}

const Orders = () => {
  const router = useRouter();
  const [data, setData] = useState<FoodOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [accessDenied, setAccessDenied] = useState(false);
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/food-orders`,
        {
          cache: "no-store",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!res.ok) throw new Error("Failed to fetch orders");
      const result = await res.json();
      setData(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

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
    }

    // const fetchData = async () => {
    //   try {
    //     const res = await fetch(
    //       `${process.env.NEXT_PUBLIC_API_URL}/api/food-orders`,
    //       { cache: "no-store" }
    //     );
    //     if (!res.ok) throw new Error("Failed to fetch orders");
    //     const result = await res.json();
    //     setData(result);
    //   } catch (error) {
    //     console.error(error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    fetchData();
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
    <div className="flex">
      <AdminSideBar />
      <DataTable columns={getColumns(fetchData)} data={data} />
    </div>
  );
};

export default Orders;
