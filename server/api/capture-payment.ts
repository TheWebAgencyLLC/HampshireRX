// Create this as a new file, e.g., /server/api/capture-payment.ts
import { useServerStripe } from "#stripe/server";

export default defineEventHandler(async (event) => {
  const stripe = await useServerStripe(event);
  const body = await readBody(event);
  const { paymentIntentId } = body;
  
  if (!paymentIntentId) {
    return {
      success: false,
      error: "Payment intent ID is required",
    };
  }
  
  try {
    // Capture the payment
    const paymentIntent = await stripe.paymentIntents.capture(paymentIntentId);
    return {
      success: true,
      paymentIntent,
      error: null,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    };
  }
});