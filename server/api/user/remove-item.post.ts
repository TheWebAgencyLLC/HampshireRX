export default defineEventHandler(async (event) => {
  try {
    const auth = await requireAuth(event);
    if ("statusCode" in auth) {
      return {
        statusCode: auth.statusCode,
        message: auth.statusText,
      };
    }
    //@ts-ignore
    const userEmail = auth.email;

    // Get item from the body
    const { item } = await readBody(event);

    // First get the current user to check their cart
    const user = await userSchema.findOne({ email: userEmail });

    if (!user) {
      return {
        statusCode: 404,
        message: "User not found",
      };
    }

    // Check if the item exists in the cart
    const existingItemIndex = user.cart.findIndex(
      (cartItem) =>
        // Compare medication properties to determine if it's the same medication
        cartItem.medication.name === item.medication.name &&
        cartItem.medication.count === item.medication.count &&
        cartItem.medication.countUnit === item.medication.countUnit &&
        cartItem.medication.price === item.medication.price,
    );

    if (existingItemIndex === -1) {
      return {
        statusCode: 404,
        message: "Item not found in cart",
        cart: user.cart,
      };
    }

    // Remove the item from the cart
    const updatedUser = await userSchema.findOneAndUpdate(
      { email: userEmail },
      { $pull: { cart: { _id: user.cart[existingItemIndex]._id } } },
      { new: true },
    );

    return {
      statusCode: 200,
      message: "Item removed from cart",
      cart: updatedUser?.cart,
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      message: error.message,
    };
  }
});
