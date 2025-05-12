import { clearAuth } from "~/server/utils/auth";

export default defineEventHandler(async (event) => {
  try {
    await clearAuth(event);
  } catch (error: any) {
    return {
      statusCode: 500,
      message: error.message,
    };
  }
});
