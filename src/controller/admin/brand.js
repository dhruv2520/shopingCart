import { brandModel } from "../../model/user/brand.js";

export class brandController {
  static addBrand = async (req, res) => {
    const { productId, categoryId, brandName } = req.body;
    try {
      const data = await brandModel.create({
        productId: productId,
        categoryId: categoryId,
        brandName: brandName,
      });
      if (data) res.status(200).send({ message: "brand Successfully Added" });
      else
        return res.status(400).send({ message: "Add brand Error In Database" });
    } catch (error) {
      console.log("error :>> ", error);
      return res.status(500).send({ message: "Internal Server Error" });
    }
  };

  static updateBrand = async (req, res) => {
    let id = req.params.id;
    try {
      const isExist = await brandModel.find();
      if (isExist.length > 0) {
        const data = await brandModel.findOneAndUpdate({ _id: id }, req.body);
        if (data)
          res.status(200).send({ message: "abmin Successfully Updated" });
      } else
        return res
          .status(400)
          .send({ message: "admin With The Specified Id Does Not Exists" });
    } catch (error) {
      return res.status(500).send({ message: error.Message });
    }
  };

  static deleteBrand = async (req, res) => {
    let id = req.params.id;
    try {
      let response = await brandModel.deleteOne({ _id: id });
      if (response) {
        return res.status(200).send({ message: "brand Successfully Delete" });
      }
      return res
        .status(404)
        .send({ message: "brand With The Specified Id Does Not Exists" });
    } catch (error) {
      console.log("error :>> ", error);
      return res.status(500).send({ message: "Internal Server Error" });
    }
  };
}
