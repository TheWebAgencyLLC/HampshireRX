<template>
  <div>
    <div>Other component using stripe</div>
    <section class="payment-container">
      <h2>Payment Details</h2>

      <!-- Payment form -->
      <form id="payment-form" @submit.prevent="handleSubmit">
        <!-- Email field for receipt -->
        <div class="form-group">
          <label for="email">Email for receipt</label>
          <input id="email" v-model="email" type="email" required />
        </div>

        <!-- Payment element will mount here -->
        <div id="payment-element" class="payment-element"></div>

        <!-- Error message display -->
        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>

        <!-- Submit button -->
        <button
          id="submit-button"
          type="submit"
          class="submit-button"
          :disabled="isLoading"
        >
          <div v-if="isLoading" class="spinner"></div>
          <span>{{ isLoading ? "Processing..." : "Save Payment Method" }}</span>
        </button>

        <!-- Payment status message -->
        <div v-if="paymentStatus" class="payment-status">
          {{ paymentStatus }}
        </div>

        <!-- Capture button - only shown after successful authorization -->
        <button
          v-if="paymentIntentId && !captured"
          @click="capturePayment"
          class="capture-button"
          :disabled="isCaptureLoading"
        >
          <div v-if="isCaptureLoading" class="spinner"></div>
          <span>{{
            isCaptureLoading ? "Capturing..." : "Complete Payment"
          }}</span>
        </button>
      </form>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useClientStripe } from "#imports";
import { watch, ref } from "vue";

// State variables
const email = ref("");
const errorMessage = ref("");
const isLoading = ref(false);
const isCaptureLoading = ref(false);
const paymentStatus = ref("");
const elements = ref(null);
const paymentIntentId = ref("");
const captured = ref(false);

// Get Stripe instance
const { stripe } = useClientStripe();

// Set up Stripe elements when Stripe is loaded
watch(
  stripe,
  async () => {
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

        // Create and mount the Payment Element
        elements.value = stripe.value.elements({
          clientSecret: clientSecret as string,
          appearance: {
            theme: "stripe",
          },
        });

        const paymentElement = elements.value.create("payment");
        paymentElement.mount("#payment-element");
      } catch (e) {
        errorMessage.value =
          "An error occurred while setting up the payment form.";
        console.error(e);
      } finally {
        isLoading.value = false;
      }
    }
  },
  {
    immediate: true,
  },
);

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
        return_url: `${window.location.origin}/payment-confirmation`,
        receipt_email: email.value,
      },
      redirect: "if_required",
    });

    if (error) {
      errorMessage.value = error.message;
    } else {
      // Authorization succeeded
      paymentStatus.value =
        'Payment method authorized! Click "Complete Payment" to finalize.';
    }
  } catch (e) {
    errorMessage.value = "An unexpected error occurred.";
    console.error(e);
  } finally {
    isLoading.value = false;
  }
};

// Function to capture the authorized payment
const capturePayment = async () => {
  if (!paymentIntentId.value) {
    errorMessage.value = "No payment to capture";
    return;
  }

  try {
    isCaptureLoading.value = true;
    errorMessage.value = "";

    // Call the capture endpoint
    const { success, error } = await $fetch("/api/capture-payment", {
      method: "POST",
      body: {
        paymentIntentId: paymentIntentId.value,
      },
    });

    if (!success) {
      errorMessage.value = error || "Failed to capture payment";
    } else {
      captured.value = true;
      paymentStatus.value = "Payment successfully completed!";
      // You might want to redirect to a success page or order confirmation
    }
  } catch (e) {
    errorMessage.value = "An error occurred while capturing the payment";
    console.error(e);
  } finally {
    isCaptureLoading.value = false;
  }
};
</script>

<style scoped>
.payment-container {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.payment-element {
  margin-bottom: 24px;
}

.submit-button,
.capture-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 12px;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 10px;
}

.submit-button {
  background-color: #5469d4;
}

.capture-button {
  background-color: #2e7d32;
  margin-top: 16px;
}

.submit-button:disabled,
.capture-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.error-message {
  color: #df1b41;
  margin: 16px 0;
  font-size: 14px;
}

.payment-status {
  margin-top: 16px;
  text-align: center;
  color: #0a2540;
  font-weight: 500;
}

.spinner {
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top: 3px solid white;
  width: 16px;
  height: 16px;
  animation: spin 1s linear infinite;
  margin-right: 10px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
