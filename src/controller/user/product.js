import { productModel } from "../../model/admin/product.js";

export class productDataController {
  static getproduct = async (req, res, next) => {
    try {
      const data = await productModel.aggregate([
        {
          $lookup: {
            from: "categories",
            localField: "categoryId",
            foreignField: "_id",
            as: "category",
          },
        },
        {
          $lookup: {
            from: "brands",
            localField: "brandId",
            foreignField: "_id",
            as: "brand",
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
