import { settingsSchema } from "~/server/models/settings.schema";
import { medicationSchema } from "~/server/models/medication.schema";

export default defineEventHandler(async (event) => {
  try {
    const { topMedications } = await readBody(event);
    // //console.log("Original topMedications:", topMedications);

    // Update each med in the array with the startingAt field (lowest price)
    const updatedTopMeds = await Promise.all(
      topMedications.map(async (med) => {
        // Find the medication by name using exact match, case-insensitive.
        const foundMed = await medicationSchema.findOne({
          name: { $regex: `^${med.name}$`, $options: "i" },
        });

        if (foundMed && foundMed.options && foundMed.options.length > 0) {
          // Get the price of each option as a number. (Assumes prices can be parsed as floats.)
          const prices = foundMed.options
            .map((option) => parseFloat(option.price))
            .filter((p) => !isNaN(p));

          const lowestPrice = prices.length > 0 ? Math.min(...prices) : null;
          return { ...med, startingAt: lowestPrice };
        }
        // If no medication is found or it has no options, set startingAt to null.
        return { ...med, startingAt: null };
      }),
    );

    // //console.log("Updated topMedications:", updatedTopMeds);

    const meds = await settingsSchema.findOneAndUpdate(
      {},
      { $set: { topMedications: updatedTopMeds } },
      { upsert: true, new: true },
    );

    return {
      statusCode: 200,
      body: meds,
    };
  } catch (error) {
    return {
      statusCode: 500,
      message: error.message,
    };
  }
});
