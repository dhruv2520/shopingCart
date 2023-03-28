import { Schema, model } from "mongoose";

const webhookSchema = new Schema(
  {
    id: {
      type: String,
      require: true,
    },
    amount_total: {
      type: Number,
      require: true,
    },
    payment_status: {
      type: String,
      require: true,
    },

    currency: {
      type: String,
      require: true,
    },
    body: {
      type: Object,
    },
  },
  { timestamps: true, versionKey: false }
);
export const webhookModel = model("webhook", webhookSchema);
