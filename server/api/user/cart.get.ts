export default defineEventHandler(async (event) => {
  try {
    // Authenticate the user
    const auth = await requireAuth(event);
    if ("statusCode" in auth) {
      return {
        statusCode: auth.statusCode,
        message: auth.statusText,
      };
    }

    // Get user email from auth
    //@ts-ignore
    const userEmail = auth.email;

    // Find the user and select only the cart field
    const user = await userSchema.findOne(
      { email: userEmail },
      { cart: 1, _id: 0 }, // Only return the cart field, exclude _id
    );

    if (!user) {
      return {
        statusCode: 404,
        message: "User not found",
      };
    }

    // Return just the cart
    return {
      statusCode: 200,
      cart: user.cart || [], // Return empty array if cart is undefined
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      message: error.message,
    };
  }
});
