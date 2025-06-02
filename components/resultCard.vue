<script setup lang="ts">
import { ref, computed, watch, nextTick } from "vue";
import { useCartStore } from "~/composables/useCartStore";
// Import the toast component
import ToastNotification from "~/components/ToastNotification.vue";
import { useAuthStore } from "#imports";
import { useCartGuestStore } from "~/stores/useCartGuestStore";

interface Option {
  size: string;
  count: number;
  countUnit: string;
  price?: number;
}

// Define props with proper typing
const props = defineProps<{
  data: {
    name: string;
    genericFor?: string;
    options: Option[];
    canBeSold: boolean;
  };
}>();

// Destructure genericFor as well so it can be used in the template.
const { name, genericFor, options } = props.data;

const selectedSize = ref<string>("");
// Adjust the type for selectedCount since we expect an object from the quantity dropdown.
const selectedCount = ref<{ count: number; countUnit: string } | null>(null);

// Toast notification state
const showToast = ref(false);
const toastTitle = ref("");
const toastMessage = ref("");
const toastType = ref<"success" | "error">("success");

const sizes: string[] = [];
const quantity: { count: number; countUnit: string }[] = [];

for (const option of options) {
  if (!sizes.includes(option.size)) {
    sizes.push(option.size);
  }

  const quantityExists = quantity.some(
    (q) => q.count === option.count && q.countUnit === option.countUnit,
  );

  if (!quantityExists) {
    quantity.push({ count: option.count, countUnit: option.countUnit });
  }
}

const filteredQuantities = computed(() => {
  if (!selectedSize.value) return [];

  return options
    .filter((option) => option.size === selectedSize.value)
    .map((option) => ({
      count: option.count,
      countUnit: option.countUnit,
    }))
    .filter(
      (item, index, self) =>
        index ===
        self.findIndex(
          (t) => t.count === item.count && t.countUnit === item.countUnit,
        ),
    );
});

// Set default for selectedSize and selectedCount to the first realistic option
if (sizes.length > 0) {
  selectedSize.value = sizes[0];
}
if (filteredQuantities.value.length > 0) {
  selectedCount.value = filteredQuantities.value[0];
}

// Watch for changes in selectedSize to update selectedCount accordingly
watch(selectedSize, (newSize) => {
  const newQuantities = filteredQuantities.value;
  if (newQuantities.length > 0) {
    selectedCount.value = newQuantities[0];
  } else {
    selectedCount.value = null;
  }
});

// Computed property that finds the matching option when both size and count are selected
const selectedOption = computed(() => {
  if (!selectedSize.value || !selectedCount.value) return null;
  return options.find(
    (option) =>
      option.size === selectedSize.value &&
      option.count === selectedCount.value!.count &&
      option.countUnit === selectedCount.value!.countUnit,
  );
});

const store = useCartStore();
const { isLoggedIn } = useAuthStore();
const cartStore = useCartGuestStore();

async function addToCart() {
  // Validate selections first
  if (!selectedSize.value || !selectedCount.value) {
    toastTitle.value = "Selection Required";
    toastMessage.value = "Please select both strength and quantity";
    toastType.value = "error";
    showToast.value = true;
    return;
  }

  const item = {
    medication: {
      name: props.data.name,
      count: selectedCount.value?.count,
      countUnit: selectedCount.value?.countUnit,
      price: parseFloat(price.value),
      size: selectedSize.value,
    },
    quantity: 1,
  };

  try {
    if (!isLoggedIn) {
      cartStore.updateCartQuantity(item);
      const previousCount = store.count || 0;
      store.setCount(cartStore.cart.length);
      // Show success toast
      toastTitle.value = "Added to Cart";
      toastMessage.value = `${props.data.name} (${selectedCount.value?.count} ${selectedCount.value?.countUnit}) added to cart`;
      toastType.value = "success";
      showToast.value = true;

      // Only trigger cart animation if count actually increased
      if (cartStore.cart.length > previousCount) {
        // Use setTimeout to ensure the animation is triggered after DOM updates
        setTimeout(() => {
          window.dispatchEvent(
            new CustomEvent("cart-item-added", {
              detail: { newCount: cartStore.cart.length, previousCount },
            }),
          );
        }, 100);
      }
    } else {
      const res = await $fetch("/api/user/update-cart", {
        method: "POST",
        body: { item },
      });
      console.log(res);

      // Fix the undefined cart issue
      if (res && res.cart && Array.isArray(res.cart)) {
        const previousCount = store.count || 0;
        //@ts-ignore
        store.setCount(res.cart.length);

        // Show success toast
        toastTitle.value = "Added to Cart";
        toastMessage.value = `${props.data.name} (${selectedCount.value?.count} ${selectedCount.value?.countUnit}) added to cart`;
        toastType.value = "success";
        showToast.value = true;

        // Only trigger cart animation if count actually increased
        if (res.cart.length > previousCount) {
          // Use setTimeout to ensure the animation is triggered after DOM updates
          setTimeout(() => {
            window.dispatchEvent(
              new CustomEvent("cart-item-added", {
                detail: { newCount: res.cart.length, previousCount },
              }),
            );
          }, 100);
        }
      } else {
        console.error("Invalid cart response:", res);
        // Show error toast
        toastTitle.value = "Error";
        toastMessage.value = "Failed to add item to cart. Please try again.";
        toastType.value = "error";
        showToast.value = true;
      }
    }
  } catch (e) {
    console.log(e);
    // Show error toast
    toastTitle.value = "Error";
    toastMessage.value = "Failed to add item to cart. Please try again.";
    toastType.value = "error";
    showToast.value = true;
  }
}

// Handle toast close
const onToastClose = () => {
  showToast.value = false;
};

// Computed property that returns the price for the selected option (or a fallback, e.g., "N/A")
const price = computed(() => {
  return selectedOption.value?.price ?? "N/A";
});
</script>

<template>
  <div
    class="border border-slate-200 rounded-xl xl:w-[20rem] shadow-lg bg-white overflow-hidden"
  >
    <!-- Header Section -->
    <div class="p-6 bg-white">
      <h2 class="text-xl font-bold text-gray-900 mb-2">{{ name }}</h2>
      <div class="text-sm text-gray-500 mb-6">
        Generic For:
        <span class="font-medium text-gray-700">{{
          options[0].genericFor || "N/A"
        }}</span>
      </div>

      <!-- Add to Cart Button -->
      <button
        v-if="props.data.canBeSold"
        @click="addToCart"
        class="w-full flex items-center justify-center gap-3 px-6 py-3.5 bg-pharmaBlue-400 text-white text-sm font-semibold rounded-full hover:bg-pharmaBlue-500 transition-all duration-200 focus:outline-none focus:ring-3 focus:ring-pharmaBlue-300 focus:ring-offset-2 shadow-md hover:shadow-lg"
      >
        <div
          class="w-6 h-6 bg-white rounded-full flex items-center justify-center flex-shrink-0"
        >
          <img
            src="/public/images/icons8-cart-24.png"
            alt="Cart"
            class="w-4 h-4"
          />
        </div>
        <span class="font-semibold tracking-wide">ADD TO CART</span>
      </button>
    </div>

    <!-- Selection Section -->
    <div class="px-6 pb-6">
      <div class="flex gap-4 mb-6">
        <!-- Strength Dropdown -->
        <div class="flex-shrink-0 w-32">
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Strength</label
          >
          <select
            v-model="selectedSize"
            class="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg bg-white cursor-pointer hover:border-pharmaBlue-300 focus:border-pharmaBlue-400 focus:ring-2 focus:ring-pharmaBlue-100 transition-colors"
          >
            <option disabled value="">Select Strength</option>
            <option v-for="x in sizes" :key="x" :value="x">{{ x }}</option>
          </select>
        </div>

        <!-- Quantity Dropdown -->
        <div class="flex-1">
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Quantity</label
          >
          <select
            v-model="selectedCount"
            class="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg bg-white cursor-pointer hover:border-pharmaBlue-300 focus:border-pharmaBlue-400 focus:ring-2 focus:ring-pharmaBlue-100 transition-colors"
          >
            <option disabled :value="null">Select Quantity</option>
            <option
              v-for="s in filteredQuantities"
              :key="`${s.count}-${s.countUnit}`"
              :value="s"
            >
              {{ s.count }} {{ s.countUnit }}
            </option>
          </select>
        </div>
      </div>

      <!-- Price Display -->
      <div
        class="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 px-4 py-4 rounded-lg"
      >
        <div class="flex items-center justify-between">
          <span class="text-sm font-medium text-gray-700">Price</span>
          <span class="text-2xl font-bold text-orange-600"> ${{ price }} </span>
        </div>
      </div>
    </div>

    <!-- Transfer Prescription Button -->
    <NuxtLink to="/transfer-prescription">
      <div
        class="w-full text-center bg-pharmaBlue-400 text-white py-4 font-semibold hover:bg-pharmaBlue-500 transition-colors duration-200 border-t border-pharmaBlue-200"
      >
        Transfer Prescription
      </div>
    </NuxtLink>

    <!-- Toast Notification -->
    <ToastNotification
      v-if="showToast"
      :title="toastTitle"
      :message="toastMessage"
      :type="toastType"
      @close="onToastClose"
    />
  </div>
</template>

<style scoped></style>
