import { Schema, model } from "mongoose";

const wishlistSchema=  new Schema({
   
    userId:{
        type: Schema.Types.ObjectId,
    },
    productId:{
        type: Schema.Types.ObjectId,
    },
})
   export const wishlistModel = model("wishlist",wishlistSchema);