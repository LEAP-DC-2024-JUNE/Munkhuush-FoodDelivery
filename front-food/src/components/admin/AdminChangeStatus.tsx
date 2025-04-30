"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

interface AdminChangeStatusProps {
  selectedIds: string[];
  onSuccess?: () => void;
}

const statusOptions = ["DELIVERED", "PENDING", "CANCELED"] as const;

export function AdminChangeStatus({
  selectedIds,
  onSuccess,
}: AdminChangeStatusProps) {
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const token = localStorage.getItem("token");

  const handleSave = async () => {
    if (!selectedStatus) {
      toast.error("Please select a status.");
      return;
    }

    if (selectedIds.length === 0) {
      toast.error("No orders selected.");
      return;
    }

    setIsSaving(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/food-orders/bulk-update`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            updates: selectedIds.map((id) => ({
              _id: id,
              status: selectedStatus,
            })),
          }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Bulk update failed");

      toast.success("Orders updated successfully.");
      onSuccess?.(); // reset selection or refetch
      setIsDialogOpen(false);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="bg-black text-white" variant="outline">
          Change delivery state
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[365px] gap-6">
        <DialogHeader>
          <DialogTitle>Change delivery state</DialogTitle>
        </DialogHeader>

        <div className="flex gap-4">
          {statusOptions.map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`py-2 px-2.5 rounded-full text-xs w-[94.67px] h-8 font-medium hover:cursor-pointer ${
                selectedStatus === status
                  ? "bg-black text-white"
                  : "bg-gray-100 text-black"
              }`}
            >
              {status.charAt(0) + status.slice(1).toLowerCase()}
            </button>
          ))}
        </div>

        <DialogFooter>
          <Button
            className="w-full rounded-3xl"
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
