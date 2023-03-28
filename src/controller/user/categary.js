import { categoryModel } from "../../model/admin/category.js";

export class categoryController {
  static getCategory = async (req, res) => {
    let id = req.params.id;
    try {
      const data = await categoryModel.aggregate([
        {
          $lookup: {
            from: "subcategories",
            localField: "subCategoryId",
            foreignField: "_id",
            as: "category",
          },
        },
      ]);

      if (!data == data)
        res.status(400).send({ message: "category  not avalibal" });
      if (data) res.status(200).send({ data });
      else
        return res
          .status(400)
          .send({ message: "Add category Error In Database" });
    } catch (error) {
      return res.status(500).send({ message: "Internal Server Error" });
    }
  };
}
