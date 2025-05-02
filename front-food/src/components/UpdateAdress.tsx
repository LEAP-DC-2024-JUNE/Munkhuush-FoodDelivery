import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
interface UserData {
  _id: string;
  email: string;
  address: string;
}

interface UpdateAddressProps {
  userData: UserData | null;
  setUserData: React.Dispatch<React.SetStateAction<UserData | null>>;
}

export function UpdateAddress({ userData, setUserData }: UpdateAddressProps) {
  const [open, setOpen] = useState(false);
  const [userAddress, setUserAddress] = useState({
    address: userData?.address,
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setUserAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateAddress = async () => {
    const token = localStorage.getItem("token");

    if (!token || !userData?._id) {
      toast.error("Missing token or user ID.");
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/${userData._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            address: userAddress.address,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Update failed.");
      }

      setUserData((prev: any) => ({
        ...prev,
        address: userAddress.address,
      }));
      setOpen(false);

      toast.success("Address has been updated successfully.");
    } catch (error: any) {
      toast.error("Couldn't update the address.");
      console.error("Update address error:", error.message || error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="bg-white rounded-full px-3 py-2 flex gap-1">
          <div className="flex gap-1 items-center">
            <img src="./icons/location.svg" alt="" width={20} height={20} />
            <span className="text-red-500 text-[12px]">Delivery address:</span>
          </div>
          <div className="flex gap-1 items-center">
            <span className="text-[12px] text-gray-400">
              {userData?.address.slice(0, 10)}
            </span>
            <img src="./icons/arrow.svg" alt="" width={20} height={20} />
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] gap-8">
        <DialogHeader>
          <DialogTitle>Change delivery address</DialogTitle>
          <DialogDescription>
            Please provide your new address to get your food delivery.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-2">
          <Label htmlFor="address" className="text-right">
            Edit address
          </Label>
          <textarea
            name="address"
            id="address"
            value={userAddress.address}
            className=" border h-20"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <DialogFooter>
          <Button onClick={handleUpdateAddress}>Update</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
