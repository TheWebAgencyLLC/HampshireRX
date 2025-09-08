<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navigation -->
    <LayoutAppHeader />

    <!-- Free shipping banner -->
    <div
      class="bg-pharmaBlue-400 text-white text-center py-2 px-4 text-sm sm:text-base"
    >
      Save money on your prescriptions with Hampshire Pharmacy
    </div>

    <!-- Breadcrumb -->
    <div class="container mx-auto py-4 px-4">
      <div class="flex items-center space-x-2 text-sm">
        <NuxtLink to="/" class="text-blue-500">Home</NuxtLink>
        <span>/</span>
        <NuxtLink :to="`/product/${route.params.name}`" class="text-blue-500">
          {{ PAGE_CONTENT?.[0]?.name || route.params.name }}
        </NuxtLink>
      </div>
    </div>

    <!-- Main Content -->
    <main
      class="container mx-auto px-4 py-6 sm:py-8"
      v-if="PAGE_CONTENT && PAGE_CONTENT.length"
    >
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
        <!-- Left Column - Product Image and Info -->
        <div>
          <div class="bg-blue-50 p-4 sm:p-8 rounded-lg mb-6 sm:mb-8">
            <img
              src="/public/images/prescriptionHRXBottle.png"
              alt="Medicine Bottle"
              class="mx-auto h-32 w-32 sm:h-48 sm:w-48"
            />
          </div>
          <div class="space-y-4 sm:space-y-6">
            <div class="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              <span>Prescription Required</span>
            </div>
            <div class="space-y-4">
              <div v-if="PAGE_CONTENT[0].description">
                <h2 class="text-xl font-semibold mb-2">
                  Uses of {{ PAGE_CONTENT[0].name }}
                </h2>
                <p class="text-gray-700">
                  {{ PAGE_CONTENT[0].description }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column - Product Selection and Price -->
        <div class="bg-white p-4 sm:p-8 rounded-lg shadow-lg h-fit">
          <div class="mb-6 sm:mb-8">
            <h1 class="text-2xl sm:text-3xl font-semibold mb-2">
              {{ PAGE_CONTENT[0].name }}
            </h1>
          </div>

          <div class="space-y-6">
            <!-- FORM Selection -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                FORM
              </label>
              <div class="flex flex-wrap gap-3">
                <button
                  v-for="form in forms"
                  :key="form"
                  :class="
                    form === selectedForm
                      ? 'px-4 sm:px-6 py-2 bg-blue-100 text-blue-800 rounded-md text-sm sm:text-base'
                      : 'px-4 sm:px-6 py-2 border border-gray-300 text-gray-700 rounded-md text-sm sm:text-base'
                  "
                  @click="selectedForm = form"
                >
                  {{ form }}
                </button>
              </div>
            </div>

            <!-- STRENGTH Selection -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                STRENGTH
              </label>
              <div class="flex flex-wrap gap-3">
                <button
                  v-for="strength in strengths"
                  :key="strength"
                  :class="
                    strength === selectedStrength
                      ? 'px-4 sm:px-6 py-2 bg-blue-100 text-blue-800 rounded-md text-sm sm:text-base'
                      : 'px-4 sm:px-6 py-2 border border-gray-300 text-gray-700 rounded-md text-sm sm:text-base'
                  "
                  @click="selectedStrength = strength"
                >
                  {{ strength }}
                </button>
              </div>
            </div>

            <!-- PACKAGE SIZE Selection -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                PACKAGE SIZE
              </label>
              <div class="flex flex-wrap gap-3">
                <button
                  v-for="pkg in packageSizes"
                  :key="pkg"
                  :class="
                    pkg === selectedPackageSize
                      ? 'px-4 sm:px-6 py-2 bg-blue-100 text-blue-800 rounded-md text-sm sm:text-base'
                      : 'px-4 sm:px-6 py-2 border border-gray-300 text-gray-700 rounded-md text-sm sm:text-base'
                  "
                  @click="selectedPackageSize = pkg"
                >
                  {{ pkg }}
                </button>
              </div>
            </div>

            <!-- Summary and Price -->
            <div
              class="flex items-center justify-between border-t border-b py-4 my-6"
            >
              <div>
                <p class="text-xs sm:text-sm text-gray-600">
                  {{ selectedForm }} • {{ selectedStrength }} •
                  {{ selectedPackageSize }}ct
                </p>
              </div>
              <div class="text-right">
                <p class="text-2xl sm:text-3xl font-bold">${{ price }}</p>
              </div>
            </div>

            <!-- Transfer Button -->
            <NuxtLink
              to="/transfer-prescription"
              class="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2 text-sm sm:text-base"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>

              <span>Transfer My Prescription</span>
            </NuxtLink>

            <p class="text-center text-xs sm:text-sm text-gray-600 mt-4">
              Don't see your strength or quantity?
              <a href="tel:+8476832244" class="text-blue-500 hover:underline"
                >Call Support</a
              >
            </p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const PAGE_CONTENT = ref();

// Try to get cached data first
const { data: CACHED_DATA } = useNuxtData(`FETCHED_DATA_${route.params.name}`);
if (CACHED_DATA) {
  PAGE_CONTENT.value = CACHED_DATA.value;
}

const { data: FETCHED_DATA } = await useFetch("/api/medications/findMed", {
  method: "GET",
  query: { searchTerm: route.params.name, exact: true },
  key: `FETCHED_DATA_${route.params.name}`,
});

PAGE_CONTENT.value = FETCHED_DATA.value;

// //console.log(PAGE_CONTENT.value);

// --- Dynamic Selection Logic ---

// Reactive variables for selections
const selectedForm = ref("");
const selectedStrength = ref("");
const selectedPackageSize = ref<number | null>(null);

// Compute available forms (countUnit values)
const forms = computed(() => {
  if (!PAGE_CONTENT.value || !PAGE_CONTENT.value[0].options) return [];
  const uniqueForms: string[] = [];
  PAGE_CONTENT.value[0].options.forEach((option: any) => {
    if (!uniqueForms.includes(option.countUnit)) {
      uniqueForms.push(option.countUnit);
    }
  });
  return uniqueForms;
});

// Compute available strengths filtered by the selected form
const strengths = computed(() => {
  if (!PAGE_CONTENT.value || !PAGE_CONTENT.value[0].options) return [];
  if (!selectedForm.value) return [];
  const uniqueStrengths: string[] = [];
  PAGE_CONTENT.value[0].options.forEach((option: any) => {
    if (
      option.countUnit === selectedForm.value &&
      !uniqueStrengths.includes(option.size)
    ) {
      uniqueStrengths.push(option.size);
    }
  });
  return uniqueStrengths;
});

// Compute available package sizes filtered by the selected form and strength
const packageSizes = computed(() => {
  if (!PAGE_CONTENT.value || !PAGE_CONTENT.value[0].options) return [];
  if (!selectedForm.value || !selectedStrength.value) return [];
  const uniquePackageSizes: number[] = [];
  PAGE_CONTENT.value[0].options.forEach((option: any) => {
    if (
      option.countUnit === selectedForm.value &&
      option.size === selectedStrength.value &&
      !uniquePackageSizes.includes(option.count)
    ) {
      uniquePackageSizes.push(option.count);
    }
  });
  return uniquePackageSizes;
});

// Set default selection for form when available
watch(
  forms,
  (newForms) => {
    if (newForms.length > 0 && !selectedForm.value) {
      selectedForm.value = newForms[0];
    }
  },
  { immediate: true },
);

// When the form changes, update default strength selection
watch(
  selectedForm,
  () => {
    if (strengths.value.length > 0) {
      selectedStrength.value = strengths.value[0];
    } else {
      selectedStrength.value = "";
    }
  },
  { immediate: true },
);

// When the strength changes, update default package size selection
watch(
  selectedStrength,
  () => {
    if (packageSizes.value.length > 0) {
      selectedPackageSize.value = packageSizes.value[0];
    } else {
      selectedPackageSize.value = null;
    }
  },
  { immediate: true },
);

// Determine the selected option based on form, strength, and package size
const selectedOption = computed(() => {
  if (!PAGE_CONTENT.value || !PAGE_CONTENT.value[0].options) return null;
  if (
    !selectedForm.value ||
    !selectedStrength.value ||
    selectedPackageSize.value === null
  )
    return null;
  return PAGE_CONTENT.value[0].options.find(
    (option: any) =>
      option.countUnit === selectedForm.value &&
      option.size === selectedStrength.value &&
      option.count === selectedPackageSize.value,
  );
});

// Compute the price for the selected option
const price = computed(() => {
  return selectedOption.value?.price ?? "N/A";
});
</script>

<style scoped>
/* Additional styles if needed */
</style>
