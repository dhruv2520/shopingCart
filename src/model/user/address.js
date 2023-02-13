import { Schema, model } from "mongoose";

const addressSchema = new Schema({
    userId: {
      type: Schema.Types.ObjectId,
    },
    city: {
      type: String,
      require: true,
    },
    district: {
      type: String,
      require: true,
    },
    pincode: {
      type: String,
      require: true,
    },
    address: {
      type: String,
      require: true,
    },
  });
  export const addressModel = model("address", addressSchema);
  
  
  
  
  
  
  