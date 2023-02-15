import { Schema, model } from "mongoose";
const productSchema = new Schema({
  productName: {
    type: String,
    required: true,
  },
  brandId: {
    type: Schema.Types.ObjectId,
  },
  categoryId: {
    type: Schema.Types.ObjectId,
  },
  productPrize: {
    type: Number,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  status: {
    type: Boolean,
    required: true,
    default: true,
  },
});
export const productModel = model("product", productSchema);
