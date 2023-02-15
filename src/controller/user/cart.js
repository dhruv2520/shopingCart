import { cartModel } from "../../model/user/cart.js";
import { userModel } from "../../model/user/login.js";
import { productModel } from "../../model/admin/product.js";
import mongoose from "mongoose";

export class cartController {
  static addToCart = async (req, res) => {
    try {
      let { userId, productId } = req.body;
      if (!userId || !productId) throw new Error("Please enter valid data");
      const user = await userModel.findOne({
        _id: mongoose.Types.ObjectId(userId),
      });
      if (!user) return res.send("User not found");

      const product = await productModel.findOne({
        _id: mongoose.Types.ObjectId(productId),
      });
      if (!product) throw new Error("Product not found");
      console.log("product :>> ", product);
      const availableCart = await cartModel.findOne({
        userId: mongoose.Types.ObjectId(userId),
        isCheckout: false,
      });
      console.log("availableCart :>> ", availableCart);
      console.log("product.productPrize :>> ", product.productPrize);
      if (availableCart) {
        availableCart.amount += product.productPrize;
        availableCart.productId.push(productId);
        console.log("availableCart :>> ", availableCart);
        const cartData = await availableCart.save();
        console.log("cartData :>> ", cartData);
        return res.status(200).send("add to cart1 successfully");
      } else {
        const cart = await new cartModel({
          userId: userId,
          productId: [productId],
          amount: parseInt(product.productPrize),
        });
        console.log("cart :>> ", cart);
        const cartData = await cart.save();
        res.status(200).send("add to cart 2successfully");
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  static getToCart = async (req, res) => {
    try {
      let { cartId } = req.body;
      const checkCart = await cartModel.findOne({
        isDeleted: false,
        isCheckout: false,
        _id: mongoose.Types.ObjectId(cartId),
      });
      if (!checkCart) {
        return await res.status(402).send("cart not found");
      }
      console.log("checkCart :>> ", checkCart);
      const cartData = await cartModel.aggregate([
        { $match: { _id: mongoose.Types.ObjectId(cartId) } },
        {
          $addFields: {
            productId: {
              $map: {
                input: "$productId",
                as: "p",
                in: {
                  k: "$$p",
                  v: {
                    $size: {
                      $filter: {
                        input: "$productId",
                        cond: { $eq: ["$$this", "$$p"] },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      ]);
      console.log("cartdata :>> ", cartdata);
      return res.status(200).send({ cartData });
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  static deleteCart = async (req, res) => {
    let id = req.params.id;
    try {
      let response = await cartModel.findOneAndDelete({ productId: id });
      if (response) {
        return res.status(200).send({ message: "comment Successfully Delete" });
      }
      return res.status(404).send({ message: "cart can not delete" });
    } catch (error) {
      return res.status(500).send({ message: "Internal Server Error" });
    }
  };
}
