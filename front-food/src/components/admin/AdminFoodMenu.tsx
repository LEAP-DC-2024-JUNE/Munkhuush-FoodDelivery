"use client";
import { AdminFoodCard } from "./AdminFoodCart";
import { AdminAddFood } from "./AdminAddFood";

interface FoodItem {
  _id: string;
  foodName: string;
  price: number;
  ingredients: string;
  image: string;
  category: string;
}

export interface FoodCategory {
  _id: string;
  categoryName: string;

  foods: FoodItem[];
}

export const AdminFoodMenu = ({
  foodCategories,
  isOpen,
  setIsOpen,
  selectedCategoryId,
}: {
  foodCategories: FoodCategory[];
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedCategoryId: string | null;
}) => {
  const sortedCategories = [...foodCategories];

  if (selectedCategoryId) {
    const index = sortedCategories.findIndex(
      (cat) => cat._id === selectedCategoryId
    );
    if (index !== -1) {
      const [selected] = sortedCategories.splice(index, 1);
      sortedCategories.unshift(selected);
    }
  }

  return (
    <div>
      {sortedCategories.map((category) => (
        <div
          key={category._id}
          className="p-5 rounded-xl bg-white flex flex-col gap-4"
        >
          <h1 className="text-xl font-semibold">
            {category.categoryName} ({category.foods.length})
          </h1>
          <div className="flex flex-wrap gap-4">
            <AdminAddFood
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              categoryName={category.categoryName}
              categoryId={category._id}
            />
            {category.foods.map((food) => (
              <AdminFoodCard
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                key={food._id}
                cardData={food}
                categoryName={category.categoryName}
                categoryId={category._id}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
