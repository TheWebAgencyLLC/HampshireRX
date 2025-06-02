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

    // Check if the same medication already exists in the cart
    const existingItemIndex = user.cart.findIndex(
      (cartItem) =>
        // Compare medication properties to determine if it's the same medication
        cartItem.medication.name === item.medication.name &&
        cartItem.medication.count === item.medication.count &&
        cartItem.medication.countUnit === item.medication.countUnit &&
        cartItem.medication.price === item.medication.price &&
        cartItem.medication.size === item.medication.size,
    );

    let updatedUser;
    //console.log(item.quantity);
    if (existingItemIndex !== -1) {
      // Calculate the difference to add
      const currentQuantity = user.cart[existingItemIndex].quantity || 0;
      const quantityToAdd = (item.quantity || 1) - currentQuantity;

      updatedUser = await userSchema.findOneAndUpdate(
        { email: userEmail, "cart._id": user.cart[existingItemIndex]._id },
        { $inc: { "cart.$.quantity": quantityToAdd } },
        { new: true },
      );

      return {
        statusCode: 200,
        message: "Item quantity updated in cart",
        cart: updatedUser?.cart,
      };
    } else {
      // Item doesn't exist, add new item to cart
      updatedUser = await userSchema.findOneAndUpdate(
        { email: userEmail },
        { $push: { cart: item } },
        { new: true },
      );

      return {
        statusCode: 200,
        message: "Item added to cart",
        cart: updatedUser?.cart,
      };
    }
  } catch (error: any) {
    return {
      statusCode: 500,
      message: error.message,
    };
  }
});
