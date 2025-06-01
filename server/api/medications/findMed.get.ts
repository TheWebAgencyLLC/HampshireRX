import { medicationSchema } from "~/server/models/medication.schema";

export default defineEventHandler(async (event) => {
  try {
    const { searchTerm, exact } = getQuery(event);
    let filter = {};
    if (searchTerm) {
      if (exact === "true" || exact === true) {
        // Exact match on the name field only, case-insensitive.
        filter = { name: { $regex: `^${searchTerm}$`, $options: "i" } };
      } else {
        // Fuzzy search on name or genericFor fields.
        filter = {
          $or: [
            { name: { $regex: searchTerm, $options: "i" } },
            { genericFor: { $regex: searchTerm, $options: "i" } },
          ],
        };
      }
    }
    return await medicationSchema.find(filter);
  } catch (error: any) {
    return {
      statusCode: 500,
      body: { message: "Error fetching meds", error: error.message },
    };
  }
});
