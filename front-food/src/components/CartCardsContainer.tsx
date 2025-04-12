import { CartCard } from "./CartCard";

export const CartCardsContainer = ({ storedFood, setStoredFood }) => {
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
        // <p>Your cart is empty</p>
        <div className="relative">
          <img src="./icons/emptyCart.svg" alt="emptycart" />
          <span className="absolute bottom-[46px] left-[113px] ">🍔</span>
        </div>
      )}
      <button className="text-red-500 w-[439px] h-11 border border-red-500 rounded-full">
        Add food
      </button>
    </div>
  );
};
