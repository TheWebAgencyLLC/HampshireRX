export default defineEventHandler(async (event) => {
  try {
    const headers = getHeaders(event);
    const authorization = headers.authorization;
    if (!authorization)
      return createError({
        statusCode: 401,
        statusMessage: "Unauthorized - Authorization token is required.",
      });

    const { email } = verifyToken(authorization as string);
    if (!email)
      return createError({
        statusCode: 401,
        statusMessage: "Unauthorized - Token is not valid please log in again.",
      });

    const targetUser = await userSchema.findOne({ email });

    if (!targetUser)
      return createError({
        statusCode: 404,
        statusMessage: "Unauthorized - User not found.",
      });

    return await orderSchema
      .find({ customer: targetUser?._id })
      .populate("items");
  } catch (error: any) {
    console.log(error);
    return createError({
      statusCode: 500,
      statusMessage: error.statusMessage || error.message,
    });
  }
});
