import { defineMongooseModel } from "#nuxt/mongoose";

export const subscriberSchema = defineMongooseModel({
  name: "Subscriber",
  schema: {
    email: { type: "string", unique: true, required: true },
    firstName: { type: "string" },
    subscribedAt: { type: "date", default: Date.now },
  },
});
