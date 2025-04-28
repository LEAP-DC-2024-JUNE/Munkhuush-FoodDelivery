interface FoodOrderItem {
  foodId: string;
  foodName: string;
  quantity: number;
}

interface OrderedFood {
  _id: string;
  totalPrice: number;
  status: string;
  createdAt: string;
  userAddress: string;
  foodOrderItems: FoodOrderItem[];
}

interface CartOrderHistoryCardProps {
  orderedFood: OrderedFood;
}
export const CartOrderHistoryCard = ({
  orderedFood,
}: CartOrderHistoryCardProps) => {
  return (
    <div className="flex flex-col gap-3 px-3">
      <div className="flex justify-between">
        <span className="font-bold ">
          ${orderedFood.totalPrice} (#{orderedFood._id.slice(0, 5)})
        </span>
        <span className="border border-red-500 py-1 px-2.5 rounded-full text-xs font-semibold">
          {orderedFood.status}
        </span>
      </div>
      {orderedFood.foodOrderItems?.map((item) => {
        return (
          <div key={item.foodId} className="flex justify-between ">
            <div className="flex items-center gap-2">
              <img
                src="./icons/cartfood.svg"
                alt="cartFood"
                width={16}
                height={16}
              />
              <span className="text-muted-foreground text-xs">
                {item.foodName}
              </span>
            </div>
            <span className="text-xs">x {item.quantity}</span>
          </div>
        );
      })}
      <div className="flex gap-2">
        <img src="./icons/cartDate.svg" alt="date" />
        <span className="text-muted-foreground text-xs">
          {orderedFood.createdAt}
        </span>
      </div>
      <div className="flex gap-2">
        <img src="./icons/cartAddress.svg" alt="address" />
        <span className="text-muted-foreground text-xs">
          {orderedFood.userAddress}
        </span>
      </div>
    </div>
  );
};
