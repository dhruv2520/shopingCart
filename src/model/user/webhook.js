import { Schema, model } from "mongoose";

const webhookSchema = new Schema({
  amount: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  isCheckout: {
    type: Boolean,
    default: false,
  },
});
export const webhookModel = model("webhook", webhookSchema);
