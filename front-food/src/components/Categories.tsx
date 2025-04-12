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
}
export const Categories = ({ foodCategories }: CategoriesProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -150, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 150, behavior: "smooth" });
    }
  };
  return (
    <div className="bg-neutral-700 py-8 px-12 flex flex-col gap-9">
      <h1 className="text-white font-semibold text-3xl px-10 ">Categories</h1>
      <div className="flex gap-2">
        <img onClick={scrollLeft} src="./icons/chevronLeft.svg" alt="left" />
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto no-scrollbar scroll-smooth whitespace-nowrap"
        >
          {foodCategories.length > 0 ? (
            foodCategories.map((category) => {
              return (
                <button
                  key={category._id}
                  className="py-1 px-5 bg-white rounded-full"
                >
                  {category.categoryName}
                </button>
              );
            })
          ) : (
            <p>Loading categories...</p>
          )}
        </div>
        <img onClick={scrollRight} src="./icons/chevronRight.svg" alt="right" />
      </div>
    </div>
  );
};
