import { useState } from "react";
interface CartFoodItem {
  _id: string;
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
  quantity: number;
  totalPrice: number;
}

interface CartCardProps {
  foodDetails: CartFoodItem;
  storedFood: CartFoodItem[];
  setStoredFood: React.Dispatch<React.SetStateAction<CartFoodItem[]>>;
}

export const CartCard = ({
  foodDetails,
  setStoredFood,
  storedFood,
}: CartCardProps) => {
  const [quantity, setQuantity] = useState(foodDetails.quantity);
  const [totalPrice, setTotalPrice] = useState(foodDetails.totalPrice);
  const itemIndex = storedFood.findIndex((item) => item._id == foodDetails._id);

  const handlePlus = () => {
    const newQuantity = quantity + 1;
    const newTotalPrice = foodDetails.price * newQuantity;

    setQuantity(newQuantity);
    setTotalPrice(newTotalPrice);

    const updatedStoredFood = [...storedFood];
    updatedStoredFood[itemIndex] = {
      ...updatedStoredFood[itemIndex],
      quantity: newQuantity,
      totalPrice: newTotalPrice,
    };

    setStoredFood(updatedStoredFood);
  };

  const handleMinus = () => {
    if (quantity <= 1) return;

    const newQuantity = quantity - 1;
    const newTotalPrice = foodDetails.price * newQuantity;

    setQuantity(newQuantity);
    setTotalPrice(newTotalPrice);

    const updatedStoredFood = [...storedFood];
    updatedStoredFood[itemIndex] = {
      ...updatedStoredFood[itemIndex],
      quantity: newQuantity,
      totalPrice: newTotalPrice,
    };

    setStoredFood(updatedStoredFood);
  };

  const handleRemoveItem = (id: any) => {
    const updatedFood = storedFood.filter((food) => food._id !== id);
    setStoredFood(updatedFood);
    localStorage.setItem("food", JSON.stringify(updatedFood));
  };

  return (
    <div className="flex gap-[10px]  h-[120px] bg-white w-[439px]">
      <img
        src={foodDetails.image}
        alt="foodPicture"
        className="w-[124px] h-[120px] rounded-xl"
      />
      <div className="w-[305px] h-[120px] flex flex-col gap-6">
        <div className="flex gap-[10px] justify-between">
          <div>
            <h1 className="font-bold text-[16px] text-red-500">
              {foodDetails.foodName}
            </h1>
            <p>{foodDetails.ingredients}</p>
          </div>
          <img
            className="hover:cursor-pointer "
            onClick={() => handleRemoveItem(foodDetails._id)}
            src="./icons/remove.svg"
            alt="xbutton"
          />
        </div>
        <div className="flex justify-between items-center h-9">
          <div className="flex gap-3 items-center">
            <button
              onClick={handleMinus}
              className="text-[30px] font-extralight"
            >
              -
            </button>
            <span className="font-semibold text-[18px]">{quantity}</span>
            <button
              onClick={handlePlus}
              className="text-[25px] font-extralight"
            >
              +
            </button>
          </div>
          <span>${totalPrice}</span>
        </div>
      </div>
    </div>
  );
};
