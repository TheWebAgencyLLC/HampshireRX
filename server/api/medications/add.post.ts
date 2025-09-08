import { medicationSchema } from "~/server/models/medication.schema";

export default defineEventHandler(async (event) => {
  try {
    const { name, options } = await readBody(event);
    const med = await medicationSchema.create({
      name,
      options,
      canBeSold: false,
    });
    await med.save();
    return {
      statusCode: 200,
      med,
    };
  } catch (e: any) {
    return {
      status: 500,
      body: e.message,
    };
  }
});
