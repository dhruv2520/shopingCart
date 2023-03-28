import stripe from "stripe";
import { webhookModel } from "../../model/user/webhook.js";
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
      let { userId, productId, cartId } = req.body;
      if (!req.body) throw new Error("Please enter valid data");

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
      console.log("line_items :>> ", line_items);
      const session = await Stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: line_items,
        metadata: {
          cartId: cartId.toString(),
          productId: productId.toString(),
        },
        mode: "payment",
        success_url: "https://studiorap-cb511.web.app/Thankyou",
        cancel_url: "https://studiorap-cb511.web.app/startMusic",
      });
      console.log("session :>> ", session);
      res
        .status(200)
        .send({ message: "sucessfully payment", paymentURL: session.url });
    } catch (error) {
      console.log("error :>> ", error);
      return res.status(500).send({ message: "Internal Server Error" });
    }
  };
  static adddata = async (req, res) => {
    let body = req.body;
    console.log("body :>> ", body);
    try {
      const data = await webhookModel.create({
        id: body.data.object.id,
        amount_total: body.data.object.amount_total / 100,
        currency: body.data.object.currency,
        body: body.data.object,
      });
      console.log("data :>> ", data);
      if (data.payment_status == "unpaid") {
        const checkCart = await cartModel.findOneAndUpdate(
          { _id: body.data.object.metadata.cartId },
          {
            isCheckout: true,
          }
        );
      }
      return res.status(200).send({ message: "Successfully", data });
    } catch (error) {
      console.log("error:>>>", error);
      return res.status(500).send({ message: "Internal Server Error" });
    }
  };
}
