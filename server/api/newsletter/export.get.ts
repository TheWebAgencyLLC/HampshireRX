import { subscriberSchema } from "~/server/models/subscriber.schema";
import { requireAuth } from "~/server/utils/auth";

export default defineEventHandler(async (event) => {
  const auth = await requireAuth(event);
  if (!auth || (auth as any).statusCode === 408) {
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
  }

  try {
    const subscribers = await subscriberSchema.find({}).sort({ subscribedAt: -1 });

    const rows = [
      ["First Name", "Email", "Subscribed At"],
      ...subscribers.map((s: any) => [
        s.firstName ?? "",
        s.email,
        new Date(s.subscribedAt).toLocaleString("en-US"),
      ]),
    ];

    const csv = rows.map((row) => row.map((cell) => `"${cell}"`).join(",")).join("\n");

    setHeader(event, "Content-Type", "text/csv");
    setHeader(event, "Content-Disposition", "attachment; filename=subscribers.csv");

    return csv;
  } catch (error: any) {
    return { statusCode: 500, message: error.message };
  }
});
