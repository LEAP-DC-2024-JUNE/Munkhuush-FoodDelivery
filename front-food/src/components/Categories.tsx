import { useRef } from "react";
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

interface CategoriesProps {
  foodCategories: FoodCategory[];
  selectedCategoryId: string | null;
  setSelectedCategoryId: (id: string | null) => void;
}

export const Categories = ({
  foodCategories,
  selectedCategoryId,
  setSelectedCategoryId,
}: CategoriesProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollLeft = () =>
    scrollRef.current?.scrollBy({ left: -150, behavior: "smooth" });
  const scrollRight = () =>
    scrollRef.current?.scrollBy({ left: 150, behavior: "smooth" });

  return (
    <div className="bg-neutral-700 py-8 px-12 flex flex-col gap-9">
      <h1 className="text-white font-semibold text-3xl px-10">Categories</h1>
      <div className="flex gap-2">
        <img onClick={scrollLeft} src="./icons/chevronLeft.svg" alt="left" />
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto no-scrollbar scroll-smooth whitespace-nowrap"
        >
          {foodCategories.map((category) => (
            <button
              key={category._id}
              onClick={() => setSelectedCategoryId(category._id)}
              className={`py-1 px-5 rounded-full ${
                selectedCategoryId === category._id
                  ? "bg-red-500 text-white"
                  : "bg-white"
              }`}
            >
              {category.categoryName}
            </button>
          ))}
        </div>
        <img onClick={scrollRight} src="./icons/chevronRight.svg" alt="right" />
      </div>
    </div>
  );
};
