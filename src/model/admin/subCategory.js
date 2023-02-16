import { Schema, model } from "mongoose";

const subCategorySchema = new Schema({
  categoryName: {
    type: String,
    required: true,
  },
  categoryId: {
    type: Schema.Types.ObjectId,
  },
});
export const subCategoryModel = model("subCategory", subCategorySchema);
