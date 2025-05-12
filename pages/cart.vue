<script setup lang="ts">
const { data: cartData } = await useFetch("/api/user/cart", {
  method: "GET",
});

const updateQuantity = (item: any, delta: number) => {};
const removeItem = (index: number) => {};

const calculateTotal = () => {
  return cartData.value?.cart.reduce((total, item) => {
    return total + item.medication.price * item.quantity;
  }, 0);
};
</script>

<template>
  <div class="flex flex-col min-h-screen bg-[#F7F7F5]">
    <LayoutAppHeader />
    <main class="flex-grow bg-[#F7F7F5]">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <!-- Cart Header -->
        <div class="text-center mb-8">
          <h1 class="text-4xl font-bold mb-2">Your Cart</h1>
          <p class="text-xl text-gray-600">
            Review your medications before checkout
          </p>
        </div>

        <!-- Cart Items -->
        <div class="bg-white rounded-xl shadow-md overflow-hidden p-6 md:p-8">
          <div v-if="cartData.cart && cartData.cart.length > 0">
            <!-- Cart Items List -->
            <div class="space-y-6">
              <div
                v-for="(item, index) in cartData.cart"
                :key="index"
                class="flex flex-col sm:flex-row justify-between border-b border-gray-200 pb-6 last:border-0 last:pb-0"
              >
                <div class="flex-grow">
                  <h3 class="text-lg font-medium text-gray-900">
                    {{ item.medication.name }}
                  </h3>
                  <p class="text-sm text-gray-600">
                    {{ item.medication.count }} {{ item.medication.countUnit }}
                  </p>
                  <div class="mt-2 flex items-center">
                    <div
                      class="flex items-center border border-gray-300 rounded-md"
                    >
                      <button
                        @click="updateQuantity(item, -1)"
                        class="px-3 py-1 text-gray-500 hover:bg-gray-100 focus:outline-none"
                        :disabled="item.quantity <= 1"
                      >
                        -
                      </button>
                      <span class="px-3 py-1">{{ item.quantity }}</span>
                      <button
                        @click="updateQuantity(item, 1)"
                        class="px-3 py-1 text-gray-500 hover:bg-gray-100 focus:outline-none"
                      >
                        +
                      </button>
                    </div>
                    <button
                      @click="removeItem(index)"
                      class="ml-4 text-red-500 hover:text-red-700 focus:outline-none"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div class="mt-4 sm:mt-0 text-right">
                  <p class="text-lg font-semibold">
                    ${{ (item.medication.price * item.quantity).toFixed(2) }}
                  </p>
                  <p class="text-sm text-gray-600">
                    ${{ item.medication.price.toFixed(2) }} each
                  </p>
                </div>
              </div>
            </div>

            <!-- Cart Summary -->
            <div class="mt-8 pt-6 border-t border-gray-200">
              <div class="flex justify-between text-xl font-semibold mb-6">
                <span>Subtotal:</span>
                <span>${{ calculateTotal().toFixed(2) }}</span>
              </div>
              <div class="flex flex-col sm:flex-row gap-4">
                <NuxtLink
                  to="/"
                  class="inline-flex justify-center items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                >
                  Continue Shopping
                </NuxtLink>
                <NuxtLink
                  to="/checkout"
                  class="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                >
                  Proceed to Checkout
                </NuxtLink>
              </div>
            </div>
          </div>

          <!-- Empty Cart State -->
          <div v-else class="py-12 text-center">
            <div class="text-5xl mb-4">🛒</div>
            <h3 class="text-xl font-medium text-gray-900 mb-2">
              Your cart is empty
            </h3>
            <p class="text-gray-600 mb-6">
              Start adding medications to your cart
            </p>
            <NuxtLink
              to="/"
              class="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
            >
              Browse Medications
            </NuxtLink>
          </div>
        </div>
      </div>
    </main>
    <LayoutAppFooter />
  </div>
</template>

<style scoped></style>
