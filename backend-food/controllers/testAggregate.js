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
              ingredients: "$ingredients",
              image: "$image",
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
