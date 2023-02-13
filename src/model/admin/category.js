import { Schema, model } from "mongoose";

const categorySchema=  new Schema({
    categoryName:{
        type: String,
        required: true,
    },
    brandId:{
        type: Schema.Types.ObjectId,
    },
    productId:{
        type: Schema.Types.ObjectId,
    },
})
   export const categoryModel = model("category",categorySchema);