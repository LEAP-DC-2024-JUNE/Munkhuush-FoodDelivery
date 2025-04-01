import FoodCategory from "../models/foodCategoryModel.js";
import Food from "../models/foodModel.js";

export const testAggregate = async (request, response) => {
  try {
    const result = await Food.aggregate([
      {
        $lookup: {
          from: "foodcategories",
          localField: "category",
          foreignField: "_id",
          as: "categoryInfo",
        },
      },
      {
        $unwind: "$categoryInfo",
      },
      {
        $group: {
          _id: "$categoryInfo._id",
          categoryName: { $first: "$categoryInfo.categoryName" },
          foods: {
            $push: {
              _id: "$_id",
              foodName: "$foodName",
              price: "$price",
            },
          },
        },
      },
      { $sort: { categoryName: 1 } },
    ]);

    response.status(200).json(result);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

// export const testAggregate2 = async (req, res) => {
//   try {
//     const groupedFood = await Food.aggregate([
//       {
//         $group: {
//           _id: "category",
//           foods: { $push: "$$ROOT" },
//         },
//       },
//     ]);
//     const result = await FoodCategory.populate(groupedFood, {
//       path: "_id",
//       select: "categoryName",
//     });

//     response.status(200).json(result);
//   } catch (error) {
//     response.status(404).json(error);
//   }
// };
