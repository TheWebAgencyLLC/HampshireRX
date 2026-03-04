import { subscriberSchema } from "~/server/models/subscriber.schema";

export default defineEventHandler(async (event) => {
  try {
    const { email, firstName } = await readBody(event);
    if (!email) {
      throw createError({ statusCode: 400, statusMessage: "Email is required" });
    }

    const existing = await subscriberSchema.findOne({ email });
    if (existing) {
      throw createError({ statusCode: 409, statusMessage: "Already subscribed" });
    }

    const subscriber = await subscriberSchema.create({ email, firstName });
    await subscriber.save();

    return { success: true };
  } catch (error: any) {
    if (error.statusCode) throw error;
    return { statusCode: 500, message: error.message };
  }
});
