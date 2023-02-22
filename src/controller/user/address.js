import { addressModel } from "../../model/user/address.js";

export class addressController {
  static addAddress = async (req, res) => {
    try {
      const { userId, city, district, pincode, address } = req.body;
      address;
      const response = await addressModel.findOne({
        userId: userId,
      });
      if (response) {
        return res
          .status(409)
          .send({ message: "Alredy Register Mobiole Number" });
      }

      const data = await addressModel.create({
        userId: userId,
        city: city,
        district: district,
        pincode: pincode,
        address: address,
      });
      if (data)
        res.status(200).send({ message: " address Successfully Added" });
      else
        return res
          .status(400)
          .send({ message: "Add address Error In Database" });
    } catch (error) {
      console.log("error :>> ", error);
      return res.status(500).send({ message: "Internal Server Error" });
    }
  };
  static updateAddress = async (req, res) => {
    let id = req.params.id;
    try {
      const isExist = await addressModel.find();
      if (isExist.length > 0) {
        const data = await addressModel.findOneAndUpdate({ _id: id }, req.body);
        if (data)
          res.status(200).send({ message: "address Successfully Updated" });
      } else
        return res
          .status(400)
          .send({ message: "address With The Specified Id Does Not Exists" });
    } catch (error) {
      return res.status(500).send({ message: error.Message });
    }
  };
}
