import * as React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { AdminEditFood } from "./AdminEditFood";

type foodType = {
  _id: any;
  foodName: string;
  price: number;
  ingredients: string;
  image: string;
  category: string;
};

type CardPropsType = {
  cardData: foodType;
  categoryName: string;
  categoryId: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function AdminFoodCard({
  cardData,
  isOpen,
  setIsOpen,
  categoryName,
  categoryId,
}: CardPropsType) {
  return (
    <Card className="w-[270.75px] h-[241px] p-4">
      <CardContent className=" relative p-0">
        <img
          src={cardData.image}
          alt="foodPicture"
          className="w-[238.75px] h-[129px] rounded-xl"
        />
        <div className="absolute right-[20px] bottom-[20px] hover:cursor-pointer">
          <AdminEditFood
            cardData={cardData}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            categoryName={categoryName}
            catId={categoryId}
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2 p-0">
        <div className="flex justify-between items-center w-[238.75px] ">
          <h1 className="font-medium text-[14px] text-red-500">
            {cardData.foodName}
          </h1>
          <span className="text-[12px] ">${cardData.price}</span>
        </div>
        <p className="text-[12px] ">{cardData.ingredients}</p>
      </CardFooter>
    </Card>
  );
}
