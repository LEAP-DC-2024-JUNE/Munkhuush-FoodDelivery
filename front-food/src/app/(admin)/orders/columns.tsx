"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ChevronDown, ChevronUp, MoreHorizontal } from "lucide-react";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useRef, useState } from "react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type FoodOrder = {
  _id: string;
  id: string;
  totalPrice: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
  createdAt: string;
};

export const columns: ColumnDef<FoodOrder>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "userEmail",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Customer
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    accessorKey: "foodOrderItems",
    header: "Food",
    cell: ({ row }) => {
      const [isOpen, setIsOpen] = useState(false);
      const dropdownRef = useRef<HTMLDivElement>(null);

      const items = row.getValue("foodOrderItems") as {
        foodName: string;
        quantity: number;
        image: string;
      }[];

      useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
          if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target as Node)
          ) {
            setIsOpen(false);
          }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, []);

      return (
        <div className="relative" ref={dropdownRef}>
          <button
            className="flex items-center gap-1 hover:underline"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {items.length} item{items.length > 1 ? "s" : ""}{" "}
            <ChevronDown size={16} />
          </button>

          {isOpen && (
            <div className="absolute z-10 mt-1 bg-white border shadow-lg rounded-md p-2 w-52">
              {items.map((item, index) => (
                <div key={index} className="text-sm text-gray-700 flex gap-2.5">
                  <img
                    className="w-[32px] h-[30px]"
                    src={item.image}
                    alt="foodpic"
                  />
                  <div className="flex gap-2.5">
                    <span className="">{item.foodName}</span>
                    <span>x {item.quantity}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    },
  },

  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      const rawDate = row.getValue("createdAt") as string | number | Date;
      const formattedDate = new Date(rawDate).toISOString().split("T")[0]; // YYYY-MM-DD
      return formattedDate;
    },
  },
  {
    accessorKey: "totalPrice",
    header: () => <div className="text-right">Total</div>,
    cell: ({ row }) => {
      const total = parseFloat(row.getValue("totalPrice"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(total);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "userAddress",
    header: "Delivery Address",
  },
  {
    accessorKey: "status",
    header: "Delivery state",
    cell: ({ row }) => {
      const orderId = row.original._id;
      const status = row.getValue("status") as string;
      const [isOpen, setIsOpen] = useState(false);

      const updateStatus = async (newStatus: string) => {
        try {
          await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/food-orders/${orderId}`,
            {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ status: newStatus }),
            }
          );
          // Optionally: show toast, refresh table, etc.
        } catch (error) {
          console.error("Failed to update status", error);
        }
      };

      let borderColor = "border";
      if (status === "PENDING") borderColor = "border-red-500";
      else if (status === "DELIVERED") borderColor = "border-green-500";

      return (
        <div className="relative inline-block">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`px-3 py-1 border ${borderColor} rounded-full flex items-center gap-1 text-sm font-medium`}
          >
            {status}
            <img
              src="/icons/statusArrows.svg"
              alt="arrow"
              className="w-4 h-4"
            />
          </button>

          {isOpen && (
            <div className="absolute top-10 left-0 bg-white border rounded shadow-md z-10">
              {["PENDING", "DELIVERED", "CANCELLED"].map((s) => (
                <div
                  key={s}
                  onClick={() => {
                    updateStatus(s);
                    setIsOpen(false);
                  }}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                >
                  {s}
                </div>
              ))}
            </div>
          )}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
