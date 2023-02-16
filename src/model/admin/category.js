import { Schema, model } from "mongoose";

const categorySchema=  new Schema({
    categoryName:{
        type: String,
        required: true,
    },
    subCategoryId:{
        type: Schema.Types.ObjectId,
    },
})
   export const categoryModel = model("category",categorySchema);