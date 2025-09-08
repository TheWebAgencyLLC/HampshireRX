<template>
  <div class="flex flex-col min-h-screen bg-[#F7F7F5]">
    <LayoutAppHeader />
    <main class="flex-grow bg-[#F7F7F5]">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <!-- Checkout Header -->
        <div class="text-center mb-8">
          <h1 class="text-4xl font-bold mb-2">Complete Your Order</h1>
          <p class="text-xl text-gray-600">
            Your order will be processed once payment is confirmed
          </p>
        </div>

        <!-- Checkout Form Card -->
        <div class="bg-white rounded-xl shadow-md overflow-hidden p-6 md:p-8">
          <!-- Order Summary -->
          <div class="mb-8 pb-6 border-b border-gray-200">
            <h2 class="text-2xl font-medium text-gray-900 mb-4">
              Order Summary
            </h2>
            <div class="flex justify-between text-lg">
              <span>Total Amount:</span>
              <span class="font-semibold"
                >${{ (orderAmount / 100).toFixed(2) }}</span
              >
            </div>
          </div>

          <!-- Payment Form -->
          <form
            id="payment-form"
            @submit.prevent="handleSubmit"
            class="space-y-6"
          >
            <!-- Customer Information -->
            <div>
              <h3 class="text-xl font-medium text-gray-900 mb-4">
                Customer Information
              </h3>
              <div class="space-y-4">
                <div>
                  <label
                    for="email"
                    class="block text-sm font-medium text-gray-700 mb-1"
                    >Email Address</label
                  >
                  <input
                    id="email"
                    v-model="email"
                    type="email"
                    required
                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
            </div>

            <!-- Payment Information -->
            <div>
              <h3 class="text-xl font-medium text-gray-900 mb-4">
                Payment Information
              </h3>
              <div
                id="payment-element"
                class="w-full min-h-[16rem] border border-gray-200 rounded-md p-4 bg-gray-50"
              >
                <!-- Stripe Payment Element will mount here -->
                <div
                  v-if="!stripe"
                  class="flex justify-center items-center h-32"
                >
                  <div
                    class="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"
                  ></div>
                </div>
              </div>
            </div>

            <!-- Error Message -->
            <div
              v-if="errorMessage"
              class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md"
            >
              {{ errorMessage }}
            </div>

            <!-- Payment Status -->
            <div
              v-if="paymentStatus"
              class="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md"
            >
              {{ paymentStatus }}
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition duration-200 flex items-center justify-center"
              :disabled="isLoading || orderCompleted"
            >
              <svg
                v-if="isLoading"
                class="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              {{
                isLoading
                  ? "Processing..."
                  : orderCompleted
                    ? "Order Completed"
                    : "Complete Order"
              }}
            </button>
          </form>
        </div>

        <!-- Payment Security Info -->
        <div class="mt-8 text-center">
          <div class="flex justify-center items-center space-x-4 mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-gray-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clip-rule="evenodd"
              />
            </svg>
            <span class="text-gray-600">Secure Payment Processing</span>
          </div>
          <p class="text-sm text-gray-500">
            Your payment information is encrypted and secure. We never store
            your card details.
          </p>
        </div>
      </div>
    </main>
    <LayoutAppFooter />
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useClientStripe } from "#imports";

definePageMeta({
  middleware: () => {
    const auth = useAuthStore();
    if (!auth.isLoggedIn) {
      return navigateTo("/login");
    }
  },
});

const { data: cartData } = await useFetch("/api/user/cart", {
  method: "GET",
});

const calculateTotal = () => {
  return cartData.value.cart.reduce((total, item) => {
    return total + item.medication.price * item.quantity;
  }, 0);
};

// State variables
const email = ref("");
const errorMessage = ref("");
const isLoading = ref(false);
const paymentStatus = ref("");
const elements = ref(null);
const paymentIntentId = ref("");
const orderCompleted = ref(false);
const orderAmount = ref(calculateTotal() * 100); // Amount in cents, could be fetched from your store or API

// Get Stripe instance
const { stripe } = useClientStripe();

// Set up Stripe elements when Stripe is loaded
// 1. Optimize Stripe initialization with proper cleanup
const mountPaymentElement = async () => {
  if (stripe.value) {
    try {
      isLoading.value = true;

      // Create payment intent on the server with manual capture
      const {
        clientSecret,
        paymentIntentId: intentId,
        error,
      } = await $fetch("/api/create-payment-intent");

      if (error) {
        errorMessage.value = error;
        return;
      }

      // Store the payment intent ID for later use
      paymentIntentId.value = intentId;

      // Create elements only once
      if (!elements.value) {
        elements.value = stripe.value.elements({
          clientSecret: clientSecret,
          appearance: {
            theme: "stripe",
            variables: {
              colorPrimary: "#3b82f6",
              colorBackground: "#f9fafb",
              colorText: "#1f2937",
              colorDanger: "#ef4444",
              fontFamily:
                "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
              borderRadius: "6px",
            },
          },
        });

        // Mount only once
        const paymentElement = elements.value.create("payment");
        paymentElement.mount("#payment-element");
      }
    } catch (e) {
      errorMessage.value =
        "An error occurred while setting up the payment form.";
      console.error(e);
    } finally {
      isLoading.value = false;
    }
  }
};

// 2. Use onMounted instead of immediate watch for better performance
onMounted(() => {
  if (stripe.value) {
    mountPaymentElement();
  } else {
    // Only watch until Stripe loads, then stop watching
    const stopWatch = watch(stripe, (newStripe) => {
      if (newStripe) {
        mountPaymentElement();
        stopWatch(); // Stop watching once mounted
      }
    });
  }
});

const auth = useAuthStore();

// Function to handle form submission (authorize only)
const handleSubmit = async () => {
  if (!stripe.value || !elements.value) {
    return;
  }

  try {
    isLoading.value = true;
    errorMessage.value = "";

    // Confirm the payment - this only authorizes the payment but doesn't capture
    const { error } = await stripe.value.confirmPayment({
      elements: elements.value,
      confirmParams: {
        return_url: `${window.location.origin}/order-confirmation`,
        receipt_email: email.value,
      },
      redirect: "if_required",
    });

    if (error) {
      errorMessage.value = error.message;
    } else {
      // Authorization succeeded
      paymentStatus.value =
        "Your order has been placed successfully! We will process your payment when your order is ready to ship.";
      orderCompleted.value = true;

      // Store order info for the admin panel
      await $fetch("/api/orders/create", {
        method: "POST",
        body: {
          paymentIntentId: paymentIntentId.value,
          ...testObj,
        },
        headers: {
          authorization: auth.authtoken,
        },
      });
      navigateTo("/profile");

      // Redirect to order confirmation page after a short delay
      // setTimeout(() => {
      //   navigateTo("/order-confirmation");
      // }, 3000);
    }
  } catch (e) {
    errorMessage.value = "An unexpected error occurred.";
    console.error(e);
  } finally {
    isLoading.value = false;
  }
};

const testObj = {
  items: cartData.value.cart,
  deliveryAddress: {
    street: "123 Main St",
    city: "New York",
    state: "NY",
    zip: "10001",
    country: "USA",
  },
  contactInfo: {
    name: "<NAME>",
    email: "<EMAIL>",
    phone: "123-456-7890",
  },
};

async function createOrder() {
  try {
    const res = await $fetch();
  } catch (e) {
    //console.log(e);
  }
}
</script>
