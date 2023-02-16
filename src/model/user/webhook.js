import { Schema, model } from "mongoose";

const webhookSchema = new Schema(
  {
    id: {
      type: String,
      require: true,
    },
    amount_total: {
      type: String,
      require: true,
    },
    customer_details: {
      type: String,
      require: true,
    },
    automatic_tax: {
      type: String,
      require: true,
    },
    currency: {
      type: String,
      require: true,
    },
    expires_at: {
      type: String,
      require: true,
    },
  },
  { timestamps: true, versionKey: false }
);
export const webhookModel = model("webhook", webhookSchema);
