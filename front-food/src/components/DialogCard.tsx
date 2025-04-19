"use client";
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
import { useState } from "react";
import { toast } from "sonner";

type foodType = {
  _id: any;
  foodName: string;
  price: number;
  ingredients: string;
  image: string;
};
type CartItemType = foodType & {
  quantity: number;
  totalPrice: number;
};
type CardPropsType = {
  data: foodType;
};

export function DialogCard({ data }: CardPropsType) {
  const [count, setCount] = useState(1);
  const [totalPrice, setTotalPrice] = useState(data.price);
  const [open, setOpen] = useState(false);
  const handlePlus = () => {
    setTotalPrice(data.price * (count + 1));
    setCount(count + 1);
  };
  const handleMinus = () => {
    count == 1 || count < 1 ? setCount(1) : setCount(count - 1);
    count == 1
      ? setTotalPrice(data.price)
      : setTotalPrice(data.price * (count - 1));
  };

  const handleAddFood = () => {
    if (typeof window === "undefined" || !data) return;

    try {
      const storedData = localStorage.getItem("food");
      const cart: CartItemType[] = storedData ? JSON.parse(storedData) : [];
      const itemIndex = cart.findIndex((item) => item._id === data._id);

      if (itemIndex !== -1) {
        cart[itemIndex].quantity += count;
        cart[itemIndex].totalPrice += totalPrice;
      } else {
        cart.push({ ...data, quantity: count, totalPrice });
      }
      toast(`${data.foodName} x${count} added successfully!`);

      localStorage.setItem("food", JSON.stringify(cart));
      console.log("Cart updated:", cart);
      setOpen(false);
      setCount(1);
      setTotalPrice(data.price);
    } catch (error) {
      console.error("Error updating cart:", error);
      toast("Something went wrong while adding to cart.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <img src="./icons/plus.svg" alt="" />
      </DialogTrigger>
      <DialogContent className="flex gap-6 ">
        <div className="">
          <img src={data.image} alt="image" className="w-[377px] h-[364px]" />
        </div>
        <div className="flex flex-col w-[377px] justify-between ">
          <DialogHeader>
            <DialogTitle className="text-red-500 text-3xl font-semibold">
              {data.foodName}
            </DialogTitle>
            <DialogDescription className="text-black text-[16px]">
              {data.ingredients}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex !flex-col gap-6">
            <div className="flex justify-between">
              <div className="flex flex-col">
                <span>Total price</span>
                <span className="text-[24px] font-semibold">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
              <div className="flex gap-3 items-center">
                <img
                  onClick={handleMinus}
                  src="./icons/minus.svg"
                  alt=""
                  width={44}
                  height={42}
                  className="hover:cursor-pointer"
                />
                <span>{count}</span>
                <img
                  onClick={handlePlus}
                  src="./icons/plus2.svg"
                  alt=""
                  width={44}
                  height={42}
                  className="hover:cursor-pointer"
                />
              </div>
            </div>
            <Button
              className="w-full rounded-full !ml-0 "
              onClick={handleAddFood}
            >
              Add to cart
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
