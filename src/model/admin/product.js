import mongoose from "mongoose";
var Schema = mongoose.Schema;
const productSchema=  new Schema({
    productName:{
        type: String,
        required: true,
      
    },
    brandId:{
        type: Schema.Types.ObjectId,
    },
    categoryId:{
        type: Schema.Types.ObjectId,
    },
    productPrize:{
        type: Number,
        required: true,
    },
   
    description:{
        type:String,
        required: true,
    },
    image: {
        type: String
      },
      status: {
        type: Boolean,
        required: true,
        default: true,
      },

},
          
);
 const productModel = mongoose.model("product",productSchema);
 export default productModel;