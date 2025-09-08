import { useServerStripe } from "#stripe/server";

export default defineEventHandler(async (event) => {
  /*
   * AUTH verification
   * */
  const auth = await requireAuth(event);
  if ("statusCode" in auth) {
    return {
      statusCode: auth.statusCode,
      message: auth.statusText,
    };
  }
  //@ts-ignore
  const userEmail = auth.email;

  /*
   * User information handling.
   * */
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

  /*
   * Calculate price, done in the backend to prevent manipulation in the frontend
   */
  const calculateTotal = () => {
    return user?.cart.reduce((total, item) => {
      //@ts-ignore
      return total + item.medication.price * item.quantity;
    }, 0);
  };

  /*
   * STRIPE SETUP
   * */

  const stripe = await useServerStripe(event);
  //@ts-ignore
  const orderAmount = Math.round(calculateTotal() * 100);

  let paymentIntent;
  try {
    paymentIntent = await stripe.paymentIntents.create({
      currency: "usd",
      amount: orderAmount,
      automatic_payment_methods: { enabled: true },
      capture_method: "manual", // Set to manual to authorize only
      // You can also add metadata to associate with your order
      metadata: {
        order_id: "your-order-id", // Replace with your actual order ID
      },
    });
    return {
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id, // Return the payment intent ID for later use
      error: null,
    };
  } catch (error: any) {
    return {
      clientSecret: null,
      paymentIntentId: null,
      error: error.message,
    };
  }
});
