// "use client";
// import { useEffect, useState } from "react";

// interface FoodCategory {
//   _id: string;
//   categoryName: string;
// }

// interface FoodItem {
//   _id: string;
//   foodName: string;
//   category: string;
// }

// export default function Home() {
//   const [categories, setCategories] = useState<FoodCategory[]>([]);
//   const [foods, setFoods] = useState<FoodItem[]>([]);

//   const fetchData = async () => {
//     try {
//       const categoryResponse = await fetch(
//         "http://localhost:3001/api/food-categories"
//       );
//       const foodResponse = await fetch("http://localhost:3001/api/foods");

//       const categoryData: FoodCategory[] = await categoryResponse.json();
//       const foodData: FoodItem[] = await foodResponse.json();
//       console.log(foodData);

//       setCategories(categoryData);
//       setFoods(foodData);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   return (
//     <div>
//       <div className="flex flex-col gap-20">
//         {categories.length > 0 ? (
//           categories.map((category) => (
//             <div key={category._id}>
//               <h1 className="px-4 py-2 bg-blue-500 text-white rounded">
//                 {category.categoryName}
//               </h1>
//               <div className="ml-4">
//                 {foods
//                   .filter((food) => food.category._id === category._id)
//                   .map((food) => (
//                     <p key={food._id} className="text-gray-800">
//                       {food.foodName}
//                     </p>
//                   ))}
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>Loading categories...</p>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";
import { useEffect, useState } from "react";

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

export default function Home() {
  const [foodCategories, setFoodCategories] = useState<FoodCategory[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/api/food-categories/test-aggregate"
        );
        const data: FoodCategory[] = await response.json();
        setFoodCategories(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-20">
        {foodCategories.length > 0 ? (
          foodCategories.map((category) => (
            <div key={category._id}>
              <h1 className="px-4 py-2 bg-blue-500 text-white rounded">
                {category.categoryName}
              </h1>
              <div className="ml-4">
                {category.foods.map((food) => (
                  <div key={food._id}>
                    <p className="text-gray-800">{food.foodName}</p>
                    <span>{food.price}</span>
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
}
