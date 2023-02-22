import { cartModel } from "../../model/user/cart.js";
import { userModel } from "../../model/user/login.js";
import { productModel } from "../../model/admin/product.js";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

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

  // static deleteCart = async (req, res) => {
  //   let id = req.params.productId;
  //   console.log('id :>> ', req.params.productId);
  //   try {
  //     let response = await cartModel.findOneAndDelete({ id: id[0].ObjectId });
  //     console.log('response :>> ', { id: id[0].ObjectId });
  //     if (response) {
  //       return res.status(200).send({ message: "comment Successfully Delete" });
  //     }

  //     return res.status(404).send({ message: "cart can not delete"});
  //     console.log('message :>> ',message );
  //   } catch (error) {
  //     console.log('error :>> ', error);
  //     return res.status(500).send({ message: "Internal Server Error" });
  //   }
  // };

  static deleteCart = async (req, res) => {
    console.log("hi :>> ");
    try {
      const findCart = await cartModel.findOne({ _id: req.params.id });
      const productId = await productModel.findOne({ _id: req.body.productId });
      console.log("productId :>> ", productId);
      console.log(" findCart:>> ", findCart);
      if (findCart.productId.includes(req.body.productId)) {
        const index = findCart.productId.indexOf(ObjectId(productId));
        console.log("index :>> ", index);
        if (index !== -1) {
          findCart.productId.splice(index, 1);
        }
      } else {
        throw new Error("product not found");
      }
      let cartUp = await cartModel.findOneAndUpdate(
        { _id: req.params.id },
        findCart
      );
      if (!cartUp) throw new Error("not found");
      res.send({ success: "true" });
      console.log("cartUp :>> ", cartUp);
    } catch (error) {
      console.log("error :>> ", error);
    }
  };
}
