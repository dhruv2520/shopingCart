import { brandModel } from "../../model/user/brand.js";

export class brandController {
  static getBrand = async (req, res, next) => {
    try {
      const data = await brandModel.aggregate([
        {
          $lookup: {
            from: "categories",
            localField: "categoryId",
            foreignField: "_id",
            as: "categorey",
          },
        },
        {
          $lookup: {
            from: "products",
            localField: "productId",
            foreignField: "_id",
            as: "products",
          },
        },
      ]);
      console.log("data", data);
      if (data) {
        return res.status(200).send({ message: "successfully", data: data });
      }

      return res.status(400).send({ message: "get stadunt Error In Database" });
    } catch (error) {
      return res.status(500).send({ message: error.Message });
    }
  };
}
