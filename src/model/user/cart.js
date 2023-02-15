import { Schema, model } from "mongoose";

const cartSchema = new Schema(
  {
    productId: {
      type: [Schema.Types.ObjectId],
    },
    userId: {
      type: Schema.Types.ObjectId,
    },
    amount: {
      type: Number,
    },
    isCheckout: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    createdAt: Number,
    updatedAt: Number,
  },
  { timestamps: true, versionKey: false }
);
export const cartModel = model("cart", cartSchema);
