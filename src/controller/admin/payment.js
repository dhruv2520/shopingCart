import { paymentModel } from "../../model/user/payment.js";
export class paymentController {
  static getPayment = async (req, res) => {
    const body = req.body;
    try {
      const data = await paymentModel.aggregate([
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "user",
          },
        },
      ]);
      if (data)
        res.status(200).send({ message: "payment Successfully get", data });
      else
        return res
          .status(400)
          .send({ message: "get payment Error In Database" });
    } catch (error) {
      console.log("ele :>>>>>>>>>>>>>>>> ", error);
      return res.status(500).send({ message: "Internal Server Error" });
    }
  };
}
