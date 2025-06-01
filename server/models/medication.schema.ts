import { defineMongooseModel } from "#nuxt/mongoose";

export const medicationSchema = defineMongooseModel({
  name: "Medication",
  schema: {
    name: "string",
    options: [
      {
        _id: "string",
        size: "string",
        count: "number",
        countUnit: "string",
        genericFor: "string",
        price: "string",
      },
    ],
    canBeSold: "boolean",
  },
});
