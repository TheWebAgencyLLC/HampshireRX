import { useServerStripe } from "#stripe/server";

export default defineEventHandler(async (event) => {
  const stripe = await useServerStripe(event);
  console.info("Stripe Instance", stripe);
  return {
    message: "inspect your terminal",
  };
});
