import { subscriberSchema } from "~/server/models/subscriber.schema";

export default defineEventHandler(async () => {
  try {
    const subscribers = await subscriberSchema.find({}).sort({ subscribedAt: -1 });
    return subscribers;
  } catch (error: any) {
    return { statusCode: 500, message: error.message };
  }
});
