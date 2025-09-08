export default defineEventHandler(async (event) => {
  try {
    await clearAuth(event);
    return "OK";
  } catch (error: any) {
    return createError({
      statusCode: 500,
      message: error.message,
    });
  }
});
