"use client";

interface FoodItem {
  _id: string;
  foodName: string;
  price: number;
}

interface FoodCategory {
  _id: string;
  categoryName: string;
  foods: FoodItem[];
}

type AdminCategoriesProps = {
  foodCategories: FoodCategory[];
  selectedCategoryId: string | null;
  onSelectCategory: (id: string | null) => void;
};

const AdminCategories = ({
  foodCategories,
  selectedCategoryId,
  onSelectCategory,
}: AdminCategoriesProps) => {
  return (
    <div className="flex flex-col gap-4 rounded-xl p-6 bg-white">
      <h1 className="font-semibold text-xl">Dishes category</h1>
      <div className="flex gap-3 flex-wrap">
        <button
          onClick={() => onSelectCategory(null)}
          className={`border rounded-full px-4 py-2 text-sm font-medium flex gap-2 ${
            selectedCategoryId === null ? "border-red-500 bg-red-100" : ""
          }`}
        >
          All dishes
          <span className="bg-black text-white py-0.5 px-2.5 rounded-full text-xs">
            {foodCategories.reduce(
              (acc, category) => acc + category.foods?.length,
              0
            )}
          </span>
        </button>

        {foodCategories.map((category) => (
          <button
            key={category._id}
            onClick={() => onSelectCategory(category._id)}
            className={`border rounded-full px-4 py-2 text-sm font-medium flex gap-2 ${
              selectedCategoryId === category._id
                ? "border-red-500 bg-red-100"
                : ""
            }`}
          >
            {category.categoryName}
            <span className="bg-black text-white py-0.5 px-2.5 rounded-full text-xs">
              {category.foods?.length}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

// const AdminCategories = () => {
//   const [foodCategories, setFoodCategories] = useState<FoodCategory[]>([]);

//   // useEffect(() => {
//   //   const fetchData = async () => {
//   //     try {
//   //       const response = await fetch(
//   //         `${process.env.NEXT_PUBLIC_API_URL}/api/food-categories`
//   //       );
//   //       const data: FoodCategory[] = await response.json();
//   //       setFoodCategories(data);
//   //     } catch (error) {
//   //       console.error("Error fetching data:", error);
//   //     }
//   //   };

//   //   fetchData();
//   // }, []);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(
//           `${process.env.NEXT_PUBLIC_API_URL}/api/food-categories/test-aggregate`
//         );
//         const data: FoodCategory[] = await response.json();
//         setFoodCategories(data);
//         console.log(data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div className="flex flex-col gap-4  rounded-xl p-6  bg-white ">
//       <h1 className="font-semibold text-xl">Dishes category</h1>
//       <div className="flex gap-3 flex-wrap">
//         <button className="border border-red-500 rounded-full px-4 py-2 text-sm font-medium flex gap-2">
//           All dishes
//           <span className="bg-black text-white py-0.5 px-2.5 rounded-full text-xs">
//             {foodCategories.reduce(
//               (acc, category) => acc + category.foods?.length,
//               0
//             )}
//           </span>
//         </button>
//         {foodCategories.map((category) => {
//           return (
//             <button
//               key={category._id}
//               className="border px-4 py-2 rounded-full text-sm font-medium flex gap-2"
//             >
//               {category.categoryName}
//               <span className="bg-black text-white py-0.5 px-2.5 rounded-full text-xs">
//                 {category.foods?.length}
//               </span>
//             </button>
//           );
//         })}
//         <AdminAddCategory
//           setFoodCategories={setFoodCategories}
//           foodCategories={foodCategories}
//         />
//       </div>
//     </div>
//   );
// };

export default AdminCategories;
