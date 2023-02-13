import stripe from "stripe";
import { paymentModel } from "../../model/user/payment.js";
import { cartModel } from "../../model/user/cart.js";
import mongoose from "mongoose";
const str = process.env.secrate_Access_key;
let Stripe = stripe(
  "sk_test_51MZuLqSDVkM81N91ZCbTK34TMHBpCx8QdNR8cWoe0q7m3x7dpsy2rhMbqjzLKCEIJslQIrCMOwzZLwgeuhDhas6B002Zoe9gVc"
);
export class paymentController {
  static addPayment = async (req, res) => {
    // console.log("str :>> ", str);
    try {
      let { userId } = req.body;
      if (!userId) throw new Error("Please enter valid data");

      const cartData = await cartModel.aggregate([
        {
          $match: {
            userId: mongoose.Types.ObjectId(userId),
          },
        },
        {
          $lookup: {
            from: "products",
            localField: "productId",
            foreignField: "_id",
            as: "productData",
          },
        },
      ]);

      let line_items = cartData[0].productData.map((obj) => {
        return {
          price_data: {
            currency: "inr",
            product_data: {
              name: obj.productName,
            },
            unit_amount: obj.productPrize * 100,
          },
          quantity: cartData[0].productId.filter(
            (obj1) => obj1.toString() == obj._id.toString()
          ).length,
        };
      });

      const session = await Stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: line_items,
        metadata: {},
        mode: "payment",
        success_url: "https://studiorap-cb511.web.app/Thankyou",
        cancel_url: "https://studiorap-cb511.web.app/startMusic",
      });
      // const webhookEndpoint = await stripe.webhookEndpoints.create({
      //   url: "https://example.com/my/webhook/endpoint",
      //   enabled_events: ["charge.failed", "charge.succeeded"],
      // });
      res
        .status(200)
        .send({ message: "sucessfully payment", paymentURL: session.url });
    } catch (error) {
      console.log("error :>> ", error);
      return res.status(500).send({ message: "Internal Server Error" });
    }
  };
}
