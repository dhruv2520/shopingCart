import { subCategoryModel } from "../../model/admin/subCategory.js";

export class subCategoryController {
  static addSubCategory = async (req, res) => {
    const { categoryName, categoryId } = req.body;
    try {
      const data = await subCategoryModel.create({
        categoryName: categoryName,
        categoryId: categoryId,
      });
      if (data)
        res.status(200).send({ message: "category Successfully Added" });
      else
        return res
          .status(400)
          .send({ message: "Add category Error In Database" });
    } catch (error) {
      console.log("error :>> ", error);
      return res.status(500).send({ message: "Internal Server Error" });
    }
  };

  static updateSubCategory = async (req, res) => {
    let id = req.params.id;
    try {
      const isExist = await subCategoryModel.find();
      if (isExist.length > 0) {
        const data = await subCategoryModel.findOneAndUpdate(
          { _id: id },
          req.body
        );
        if (data)
          res.status(200).send({ message: "user Successfully Updated" });
      } else
        return res
          .status(400)
          .send({ message: "user With The Specified Id Does Not Exists" });
    } catch (error) {
      return res.status(500).send({ message: error.Message });
    }
  };

  static deleteSubCategory = async (req, res) => {
    let id = req.params.id;
    try {
      let response = await subCategoryModel.deleteOne({ _id: id });
      if (response) {
        return res
          .status(200)
          .send({ message: "Category Successfully Delete" });
      }
      return res
        .status(404)
        .send({ message: "Category With The Specified Id Does Not Exists" });
    } catch (error) {
      console.log("error :>> ", error);
      return res.status(500).send({ message: "Internal Server Error" });
    }
  };
}
