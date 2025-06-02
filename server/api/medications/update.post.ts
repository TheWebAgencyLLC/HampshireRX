import { medicationSchema } from "~/server/models/medication.schema";

export default defineEventHandler(async (event) => {
  try {
    const { _id, ...updateArgs } = await readBody(event);
    const updatedMed = await medicationSchema.findByIdAndUpdate(
      _id,
      updateArgs,
      { new: true },
    );
    //console.log(updateArgs);
    //console.log(updatedMed);
    return {
      statusCode: 200,
      body: updatedMed,
    };
  } catch (e: any) {
    return {
      statusCode: 500,
      error: e.message,
    };
  }
});
