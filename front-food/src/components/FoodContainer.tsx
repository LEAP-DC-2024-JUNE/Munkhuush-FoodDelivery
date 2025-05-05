"use client";
import { FoodCard } from "./FoodCard";

interface FoodItem {
  _id: string;
  foodName: string;
  price: number;
  ingredients: string;
  image: string;
}

interface FoodCategory {
  _id: string;
  categoryName: string;
  foods: FoodItem[];
}

interface FoodContainerProps {
  foodCategories: FoodCategory[];
  selectedCategoryId: string | null;
}

export const Foodcontainer = ({
  foodCategories,
  selectedCategoryId,
}: FoodContainerProps) => {
  const reordered = [...foodCategories];
  if (selectedCategoryId) {
    const index = reordered.findIndex((cat) => cat._id === selectedCategoryId);
    if (index > -1) {
      const [selected] = reordered.splice(index, 1);
      reordered.unshift(selected);
    }
  }

  return (
    <div className="py-12 bg-neutral-700">
      <div className="px-[88px] flex flex-col gap-20 bg-neutral-700">
        {reordered.length > 0 ? (
          reordered.map((category) => (
            <div key={category._id} className="flex flex-col gap-[54px]">
              <h1 className=" text-white font-semibold text-3xl">
                {category.categoryName}
              </h1>
              <div className=" flex flex-wrap gap-9">
                {category.foods.map((food) => (
                  <div key={food._id}>
                    <FoodCard cardData={food} />
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p>Loading categories...</p>
        )}
      </div>
    </div>
  );
};
