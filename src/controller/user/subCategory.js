import { subCategoryModel } from "../../model/admin/subCategory.js";

export class subCategoryController {
  static getSubCategory = async (req, res, next) => {
    try {
      const data = await subCategoryModel.aggregate([
        {
          $lookup: {
            from: "categories",
            localField: "categoryId",
            foreignField: "_id",
            as: "category",
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
