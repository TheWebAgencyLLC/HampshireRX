import { useServerStripe } from "#stripe/server";

export default defineEventHandler(async (event) => {
  try {
    //verify Auth
    const authResult = await requireAuth(event);
    //checks if the auth is still valid otherwise throw error
    //@ts-ignore
    if (authResult.statusCode === 408) {
      throw createError({
        statusCode: 408,
        message: "Auth Timeout",
      });
    }
    const payload = await requireAuth(event);
    //@ts-ignore
    const userEmail = payload.email;
    const user = await userSchema.findOne({ email: userEmail });
    console.log(user);

    //Initialize stripe, passing the H3Event
    const stripe = await useServerStripe(event);
    //read body
    const body = await readBody(event);
    const {
      paymentIntentId,
      items,
      deliveryAddress,
      billingAddress = {},
      contactInfo,
      notes,
    } = body;
    //throw error if critical information is missing.
    if (!items || !items.length || !deliveryAddress || !contactInfo?.email) {
      throw createError({
        statusCode: 400,
        message: "Missing required fields",
      });
    }
    let subtotal = 0;
    for (const item of items) {
      const medication = item.medication;
      subtotal = subtotal + medication.price * item.quantity;
    }
    //Calculate all prices, taxes, discounts, etc.
    const taxRate = 0.07;
    const taxAmount = Math.round(subtotal * taxRate * 100) / 100;
    const total = subtotal + taxAmount;

    const amountInCents = Math.round(total * 100);

    const order = await orderSchema.create({
      items: items,
      //@ts-ignore
      customer: user._id,
      payment: {
        status: "authorized",
        method: "card",
        paymentIntentId: paymentIntentId,
        amountAuthorized: amountInCents,
      },
      dateOrdered: new Date(),
      subtotal: subtotal,
      taxAmount: taxAmount,
      total: total,
      deliveryAddress: deliveryAddress,
      contactInfo: contactInfo,
      notes: notes,
    });
    return {
      success: true,
      order: {
        id: order._id,
        status: order.status,
        total: order.total,
      },
    };
  } catch (e: any) {
    return {
      statusCode: 500,
      message: e.message,
    };
  }
});
