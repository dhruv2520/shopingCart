import { productModel } from "../../model/admin/product.js";
import { uploadFile } from "../../utils/upload.js";

export class productController {
  static addProduct = async (req, res) => {
    try {
      const { productName, categoryId, brandId, productPrize, description } =
        req.body;
      const foundItem = await productModel.findOne({ productName });
      if (foundItem) return res.send({ massage: "Product Already Exist" });
      if (!req.files) return res.send({ massage: "Please Provide Image" });

      if (
        !productName ||
        !categoryId ||
        !brandId ||
        !productPrize ||
        !description
      )
        return res.send({ massage: "Please Provide Product Details" });
      const item = new productModel({
        productName,
        categoryId,
        brandId,
        productPrize,
        description,
      });
      console.log("item", item);
      const file = uploadFile(item._id, req.files.image);
      item.image = file;
      const productData = await item.save();
      return res.status(200).send({
        success: true,
        massage: "Product Added Successfully",
      });
    } catch (error) {
      res.status({ success: false, message: error.message });
    }
  };

  static deleteProduct = async (req, res) => {
    let id = req.params.id;
    try {
      let response = await productModel.deleteOne({ _id: id });
      if (response) {
        return res.status(200).send({ message: "product Successfully Delete" });
      }
      return res
        .status(404)
        .send({ message: "product With The Specified Id Does Not Exists" });
    } catch (error) {
      console.log("error :>> ", error);
      return res.status(500).send({ message: "Internal Server Error" });
    }
  };

  static updateProduct = async (req, res) => {
    let id = req.params.id;
    try {
      const isExist = await productModel.find();
      if (isExist.length > 0) {
        const data = await productModel.findOneAndUpdate({ _id: id }, req.body);
        if (data)
          res.status(200).send({ message: "product Successfully Updated" });
      } else
        return res
          .status(400)
          .send({ message: "product With The Specified Id Does Not Exists" });
    } catch (error) {
      return res.status(500).send({ message: error.Message });
    }
  };
}
