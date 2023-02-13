import { Schema, model } from "mongoose";

const brandSchema = new Schema({
    productId: {
      type: Schema.Types.ObjectId,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
    },
    brandName: {     
     type: String,
      require: true,
    },
    
  });
  export const brandModel = model("brand", brandSchema);
  
  
  
  
  
  