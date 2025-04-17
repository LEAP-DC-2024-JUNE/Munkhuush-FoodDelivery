import { useRouter } from "next/navigation";
import { CartCard } from "./CartCard";
interface CartFoodItem {
  _id: string;
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
  quantity: number;
  totalPrice: number;
}

interface CartCardsContainerProps {
  storedFood: CartFoodItem[];
  setStoredFood: React.Dispatch<React.SetStateAction<CartFoodItem[]>>;
  closeSheet: () => void;
}

export const CartCardsContainer = ({
  storedFood,
  setStoredFood,
  closeSheet,
}: CartCardsContainerProps) => {
  const router = useRouter();
  const handleAddFood = () => {
    closeSheet();
    router.push("/");
  };
  return (
    <div className="w-[471px] bg-white p-4 flex flex-col gap-5 rounded-[20px]">
      <h1 className="font-semibold text-xl">My cart</h1>
      {storedFood.length > 0 ? (
        storedFood.map((item) => (
          <CartCard
            key={item._id}
            foodDetails={item}
            setStoredFood={setStoredFood}
            storedFood={storedFood}
          />
        ))
      ) : (
        <div className="relative">
          <img src="./icons/emptyCart.svg" alt="emptycart" />
          <span className="absolute bottom-[46px] left-[113px] ">🍔</span>
        </div>
      )}
      <button
        onClick={handleAddFood}
        className="text-red-500 w-[439px] h-11 border border-red-500 rounded-full"
      >
        Add food
      </button>
    </div>
  );
};
