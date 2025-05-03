import { checkoutOrder } from "@/utils/apiService";
import { jwtDecode } from "jwt-decode";
import type { StoredFoodItem } from "@/utils/types";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
interface CheckoutSectionProps {
  storedFood: StoredFoodItem[];
  setStoredFood: (items: StoredFoodItem[]) => void;
  onCheckoutSuccess: () => void; // ✅ callback
}

interface MyJwtPayload {
  id: string;
  address: string;
  email: string;
  role: string;
}

export const CheckoutSection = ({
  storedFood,
  setStoredFood,
  onCheckoutSuccess,
}: CheckoutSectionProps) => {
  const router = useRouter();
  const totalPrice =
    storedFood.reduce((acc, item) => acc + item.totalPrice, 0) + 0.99;
  const itemQuantities = storedFood.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  const handleCheckout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You must be logged in to checkout.");
        router.push("/login");
        return;
      }

      const userData = jwtDecode<MyJwtPayload>(token);
      console.log(userData.id);
      const userId = userData.id;

      const data = await checkoutOrder(userId, storedFood, totalPrice);

      toast.success("Order placed successfully!");
      setStoredFood([]);
      localStorage.removeItem("food");
      onCheckoutSuccess();
    } catch (error: any) {
      console.error("Checkout error:", error);
      alert("Checkout failed: " + error.message);
    }
  };

  return (
    <>
      {storedFood.length > 0 && (
        <div className="bg-white w-[471px] rounded-[20px] flex flex-col gap-5 p-4">
          <h1 className="font-semibold text-xl">Payment info</h1>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <span>Items</span>
              <span>{itemQuantities}x</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>$0.99</span>
            </div>
          </div>
          <img src="./divider.svg" alt="divider" />
          <div className="flex justify-between">
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <button
            onClick={handleCheckout}
            className="w-[439px] h-11 rounded-full bg-red-500 text-white text-[14px] font-medium"
          >
            Checkout
          </button>
        </div>
      )}
    </>
  );
};
