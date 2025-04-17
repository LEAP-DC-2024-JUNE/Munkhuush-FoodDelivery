"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import { CartCardsContainer } from "./CartCardsContainer";
import { CheckoutSection } from "./CheckoutSection";
import { CartOrderHistoryContainer } from "./CartOrderHistoryContainer";
interface FoodItem {
  _id: string;
  foodName: string;
  price: number;
  ingredients: string;
  image: string;
  quantity: number;
  totalPrice: number;
}

export function CartSheet() {
  const [storedFood, setStoredFood] = useState<FoodItem[]>([]);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // const [isOpen, setisOpen] = useState(false);
  // useEffect(() => {
  //   const getCartItems = () => {
  //     if (typeof window !== "undefined") {
  //       const response = JSON.parse(localStorage.getItem("food")) || [];
  //       setStoredFood(response);
  //     }
  //   };

  //   getCartItems();
  // }, [isOpen]);

  return (
    <Sheet
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (open) {
          const response = JSON.parse(localStorage.getItem("food") || "[]");
          setStoredFood(response);
        }
      }}
    >
      <SheetTrigger asChild>
        <img src="./icons/cart.svg" alt="icon" width={36} height={36} />
      </SheetTrigger>
      <SheetContent className="bg-neutral-700 !max-w-[535px] p-8 gap-6 overflow-y-auto max-h-screen border-none">
        <SheetHeader className="p-0 gap-6">
          <SheetTitle>
            <div className="flex gap-3">
              <img src="./icons/shoppingCart.svg" alt="shoppinCart" />
              <h1 className="text-white">Order detail</h1>
            </div>
          </SheetTitle>

          <div className="w-[471px] h-[44px] bg-white rounded-full flex justify-center items-center gap-2">
            <button
              onClick={() => setIsClicked(false)}
              className={`w-[227.5px] h-9 rounded-full text-[18px] ${
                isClicked ? "bg-white text-black" : "bg-red-500 text-white"
              }`}
            >
              Cart
            </button>
            <button
              onClick={() => setIsClicked(true)}
              className={`w-[227.5px] h-9 rounded-full text-[18px] ${
                isClicked ? "bg-red-500 text-white" : "bg-white text-black"
              }`}
            >
              Order
            </button>
          </div>
        </SheetHeader>
        {!isClicked ? (
          <CartCardsContainer
            storedFood={storedFood}
            setStoredFood={setStoredFood}
            closeSheet={() => setIsOpen(false)}
          />
        ) : (
          <CartOrderHistoryContainer closeSheet={() => setIsOpen(false)} />
        )}
        <SheetFooter className="p-0">
          <SheetClose asChild>
            <CheckoutSection
              storedFood={storedFood}
              setStoredFood={setStoredFood}
            />
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
