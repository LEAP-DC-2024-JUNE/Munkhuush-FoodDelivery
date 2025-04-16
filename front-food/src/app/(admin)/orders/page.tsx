import { AdminSideBar } from "@/components/AdminSideBar";
import { FoodOrder, columns } from "./columns";
import { DataTable } from "./data-table";
async function getData(): Promise<FoodOrder[]> {
  const res = await fetch("http://localhost:3001/api/food-orders", {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch orders");
  const data = await res.json();
  console.log(data);
  return data;
}

const Orders = async () => {
  const data = await getData();
  return (
    <div className="flex">
      <AdminSideBar />
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default Orders;
