<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useCartStore } from "~/composables/useCartStore";

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
  };
}>();

// Destructure genericFor as well so it can be used in the template.
const { name, genericFor, options } = props.data;

const selectedSize = ref<string>("");
// Adjust the type for selectedCount since we expect an object from the quantity dropdown.
const selectedCount = ref<{ count: number; countUnit: string } | null>(null);

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

async function addToCart() {
  const item = {
    medication: {
      name: props.data.name,
      count: selectedCount.value?.count,
      countUnit: selectedCount.value?.countUnit,
      price: parseFloat(price.value),
    },
    quantity: 1,
  };
  try {
    const res = await $fetch("/api/user/update-cart", {
      method: "POST",
      body: { item },
    });
    console.log(res);
    //@ts-ignore
    store.setCount(res.cart.length);
  } catch (e) {
    console.log(e);
  }
}

// Computed property that returns the price for the selected option (or a fallback, e.g., "N/A")
const price = computed(() => {
  return selectedOption.value?.price ?? "N/A";
});
</script>

<template>
  <div
    class="border border-slate-200 rounded-lg xl:w-[20rem] shadow-lg bg-white overflow-hidden"
  >
    <!-- Header Section -->
    <div class="p-4 bg-gray-50">
      <h2 class="text-lg font-semibold text-gray-800">{{ name }}</h2>
      <div class="text-sm text-gray-600">
        Generic For:
        <span class="font-medium text-gray-800">{{ genericFor }}</span>
      </div>
      <button @click="addToCart">Add to Cart</button>
    </div>

    <!-- Selection Section -->
    <div class="p-4">
      <div class="flex items-center justify-between gap-3 mb-4">
        <!-- Strength Dropdown -->
        <div class="flex-1">
          <div class="text-xs text-gray-500 mb-1.5">Strength</div>
          <select
            v-model="selectedSize"
            class="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md bg-white cursor-pointer hover:border-gray-400"
          >
            <option disabled value="">Select a Strength</option>
            <option v-for="x in sizes" :key="x" :value="x">{{ x }}</option>
          </select>
        </div>

        <!-- Quantity Dropdown -->
        <div class="flex-1">
          <div class="text-xs text-gray-500 mb-1.5">Quantity</div>
          <select
            v-model="selectedCount"
            class="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md bg-white cursor-pointer hover:border-gray-400"
          >
            <option disabled :value="null">Select a Quantity</option>
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
        class="flex items-center justify-between bg-orange-50 px-4 py-3 rounded-md mb-4"
      >
        <span class="text-sm text-gray-600">Price</span>
        <span class="text-lg font-semibold text-orange-500">
          ${{ price }}
        </span>
      </div>
    </div>

    <!-- Action Button - Full width with no side padding -->

    <NuxtLink to="/transfer-prescription">
      <div
        class="w-full text-center bg-pharmaBlue-400 text-white py-3 font-medium hover:bg-pharmaBlue-500 transition-colors"
      >
        Transfer Prescription
      </div>
    </NuxtLink>
  </div>
</template>

<style scoped></style>
