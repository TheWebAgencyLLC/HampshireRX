import { requireAuth } from "~/server/utils/auth";
import { _useSession } from "~/server/utils/session";
import { logger } from "@nuxt/kit";

export default defineEventHandler(async (event) => {
  try {
    const payload = await requireAuth(event);
    // Check if payload is an error object
    if (typeof payload === "object" && "statusCode" in payload) {
      return createError({
        statusCode: payload.statusCode,
        //@ts-ignore
        statusMessage: payload.statusMessage || payload.statusText,
      });
    }

    const sessionData = (await _useSession(event)).data;
    // Check if session data is empty or doesn't contain expected user info
    if (!sessionData || !sessionData.email) {
      return createError({
        statusCode: 401,
        statusMessage: "No user logged in",
      });
    }

    return sessionData;
  } catch (e: any) {
    return createError({
      statusCode: e.statusCode || 500,
      statusMessage: e.statusMessage || e.message,
    });
  }
});
