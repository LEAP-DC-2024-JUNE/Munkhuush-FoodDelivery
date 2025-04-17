import * as React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { DialogCard } from "./DialogCard";

type foodType = {
  _id: any;
  foodName: string;
  price: number;
  ingredients: string;
  image: string;
};

type CardPropsType = {
  cardData: foodType;
};

export function FoodCard({ cardData }: CardPropsType) {
  return (
    <Card className="w-[397px] h-[370px]">
      <CardContent className=" relative">
        <img
          src={cardData.image}
          alt="foodPicture"
          className="w-[365px] h-[210px] rounded-xl"
        />
        <div className="absolute right-[42px] bottom-[42px] hover:cursor-pointer">
          <DialogCard data={cardData} />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <div className="flex justify-between items-center w-[347px] ">
          <h1 className="font-semibold text-[24px] text-red-500">
            {cardData.foodName}
          </h1>
          <span className="text-[18px] font-semibold">${cardData.price}</span>
        </div>
        <p className="text-[14px] ">{cardData.ingredients}</p>
      </CardFooter>
    </Card>
  );
}
