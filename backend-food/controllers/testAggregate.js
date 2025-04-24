// import Food from "../models/foodModel.js";

// export const testAggregate = async (request, response) => {
//   try {
//     const result = await Food.aggregate([
//       {
//         $lookup: {
//           from: "foodcategories",
//           localField: "category",
//           foreignField: "_id",
//           as: "categoryInfo",
//         },
//       },
//       {
//         $unwind: "$categoryInfo",
//       },
//       {
//         $group: {
//           _id: "$categoryInfo._id",
//           categoryName: { $first: "$categoryInfo.categoryName" },
//           foods: {
//             $push: {
//               _id: "$_id",
//               foodName: "$foodName",
//               price: "$price",
//               ingredients: "$ingredients",
//               image: "$image",
//             },
//           },
//         },
//       },
//       { $sort: { categoryName: 1 } },
//     ]);

//     response.status(200).json(result);
//   } catch (error) {
//     response.status(500).json({ error: error.message });
//   }
// };

import Food from "../models/foodModel.js";
import FoodCategory from "../models/foodCategoryModel.js"; // Assuming you have this

export const testAggregate = async (req, res) => {
  try {
    const result = await FoodCategory.aggregate([
      {
        $lookup: {
          from: "foods", // collection name
          localField: "_id", // category ID
          foreignField: "category", // food's category field
          as: "foods",
        },
      },
      {
        $project: {
          _id: 1,
          categoryName: 1,
          foods: {
            $map: {
              input: "$foods",
              as: "food",
              in: {
                _id: "$$food._id",
                foodName: "$$food.foodName",
                price: "$$food.price",
                ingredients: "$$food.ingredients",
                image: "$$food.image",
              },
            },
          },
        },
      },
      { $sort: { categoryName: 1 } },
    ]);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
