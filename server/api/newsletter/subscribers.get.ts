import { subscriberSchema } from "~/server/models/subscriber.schema";
import { requireAuth } from "~/server/utils/auth";

export default defineEventHandler(async (event) => {
  const auth = await requireAuth(event);
  if (!auth || (auth as any).statusCode === 408) {
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
  }

  try {
    const subscribers = await subscriberSchema.find({}).sort({ subscribedAt: -1 });
    return subscribers;
  } catch (error: any) {
    return { statusCode: 500, message: error.message };
  }
});
