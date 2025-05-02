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
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  useEffect(() => {
    const stored = localStorage.getItem("food");
    const parsed = stored ? JSON.parse(stored) : [];
    setStoredFood(parsed);
  }, []);
  useEffect(() => {
    const syncCart = () => {
      const updated = localStorage.getItem("food");
      const parsed = updated ? JSON.parse(updated) : [];
      setStoredFood(parsed);
    };

    window.addEventListener("storage", syncCart);
    return () => window.removeEventListener("storage", syncCart);
  }, []);

  const totalQuantity = storedFood.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  const handleCheckoutSuccess = () => {
    setIsOpen(false);
    setShowSuccess(true);
    setStoredFood([]);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <>
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
          <img src="/orderSuccess.svg" alt="Success" />
        </div>
      )}
      <Sheet
        open={isOpen}
        onOpenChange={(open) => {
          setIsOpen(open);
          if (open) {
            const updated = localStorage.getItem("food");
            const parsed = updated ? JSON.parse(updated) : [];
            setStoredFood(parsed);
          }
        }}
      >
        <SheetTrigger asChild>
          <div className="relative">
            <img src="./icons/cart.svg" alt="icon" width={36} height={36} />
            {totalQuantity > 0 && (
              <span className="absolute -bottom-1 -right-1 bg-red-400 text-white px-1.5 rounded-full text-xs">
                {totalQuantity}
              </span>
            )}
          </div>
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
                onCheckoutSuccess={handleCheckoutSuccess}
              />
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}
