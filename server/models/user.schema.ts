import { defineMongooseModel } from "#nuxt/mongoose";
import { Schema } from "mongoose";

export const userSchema = defineMongooseModel({
  name: "User",
  schema: {
    email: { type: "string", unique: true, required: true },
    password: { type: "string", required: true },
    firstName: { type: "string" },
    lastName: { type: "string" },
    DOB: { type: Date },
    address: {
      street: { type: "string" },
      city: { type: "string" },
      state: { type: "string" },
      zip: { type: "string" },
    },
    phone: { type: "string" },
    //@ts-ignore
    role: {
      type: String, // Use the actual String constructor, not a string
      enum: ["user", "admin"],
      default: "user",
    },
    cart: [
      {
        medication: {
          name: { type: String, required: true },
          count: { type: Number, required: true },
          countUnit: { type: String, required: true },
          price: { type: Number, required: true },
          size: { type: String, required: false },
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
          min: 1,
        },
        // medID: {
        //   type: Schema.Types.ObjectId,
        //   ref: "Medication",
        //   required: true,
        // },
      },
    ],
    orders: [
      {
        type: "ObjectId",
        ref: "Order",
      },
    ],
  },
});
