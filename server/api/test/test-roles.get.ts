import { requireAuth } from "~/server/utils/auth";

export default defineEventHandler(async (event) => {
  try {
    // //console.log(await getAuth(event));
    // //console.log(await requireAuth(event));
    const data = await requireAuth(event);
    if ("statusCode" in data) {
      return createError({
        statusCode: data.statusCode,
        statusText: data.statusText,
      });
    }
    // //console.log(data.email);
    // const email = await getAuth(event);
    // const user = await userSchema.findOne({ email });
    // //console.log(checkRole(user));
    // //console.log(await requireAuth(event));

    // //console.log(event.context.sessions);

    // //console.log(user);
  } catch (e: any) {
    return {
      statusCode: e.statusCode || 500,
      error: e.statusText || e.message,
    };
  }
});
