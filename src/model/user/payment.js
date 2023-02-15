import { Schema, model } from "mongoose";

const paymentSchema = new Schema(
  {
    cartId: {
      type: Schema.Types.ObjectId,
    },

    userId: {
      type: Schema.Types.ObjectId,
    },
    productId: {
      type: Schema.Types.ObjectId,
    },
  },
  { timestamps: true, versionKey: false }
);
export const paymentModel = model("payment", paymentSchema);
