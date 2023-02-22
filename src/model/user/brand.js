import { Schema, model } from "mongoose";

const brandSchema = new Schema({
  brandName: {
    type: String,
    require: true,
  },
});
export const brandModel = model("brand", brandSchema);
