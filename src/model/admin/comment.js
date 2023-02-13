import { Schema, model } from "mongoose";

const commentSchema=  new Schema({
    comment:{
        type: String,
        required: true,
       
        productId:{
            type: Schema.Types.ObjectId,
        },
    },
})
   export const commentModel = model("comment",commentSchema);