<template>
  <div class="min-h-screen">
    <!-- Floating CTA -->
    <div
      v-show="showFloatingCTA"
      class="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 p-4 transform transition-transform z-50"
      :class="showFloatingCTA ? 'translate-y-0' : 'translate-y-full'"
    >
      <div class="max-w-7xl mx-auto flex justify-between items-center">
        <div class="flex items-center gap-4">
          <span class="font-bold text-base md:text-xl"
            >Save Up To 95% Today</span
          >
          <span class="hidden md:block text-gray-600"
            >Transfer Your Prescription Now</span
          >
        </div>
        <button
          @click="handleFloatingCTA"
          class="bg-pharmaBlue-400 text-white px-6 py-2 rounded-md hover:bg-opacity-90 transition"
        >
          Transfer Prescription
        </button>
      </div>
    </div>

    <!-- Navigation and Banner Components -->
    <LayoutAppHeader />
    <DiscountBanner />

    <div
      class="bg-gradient-to-br from-orange-400 via-orange-500 to-pharmaBlue-400 pt-20 pb-32"
    >
      <div class="max-w-7xl mx-auto px-4">
        <MedLandingHeroSectionContent />

        <div class="flex flex-col md:flex-row justify-center gap-4">
          <!-- Sildenafil Card -->
          <div
            class="w-full md:max-w-xl bg-white/95 rounded-xl shadow-lg p-6 backdrop-blur-sm"
          >
            <div class="flex items-center gap-4 mb-6">
              <div
                class="w-12 h-12 bg-pharmaBlue-400 rounded-full flex items-center justify-center"
              >
                <svg
                  class="w-6 h-6 text-white"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <rect
                    x="3"
                    y="8"
                    width="18"
                    height="8"
                    rx="4"
                    stroke-width="2"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v8"
                  />
                </svg>
              </div>
              <div>
                <h3 class="text-xl font-bold text-gray-800">Sildenafil</h3>
                <p class="text-gray-600">Generic For: Viagra</p>
              </div>
            </div>

            <!-- Generic Price Display -->
            <div class="grid grid-cols-2 gap-4 mb-4">
              <div class="border border-gray-200 rounded-lg p-4 bg-green-50">
                <span class="text-sm text-gray-500">Our Generic Price</span>
                <div class="font-bold text-green-600">
                  ${{ currentPriceMedOne }}
                </div>
              </div>
            </div>

            <!-- Dosage Options -->
            <div class="mb-4">
              <h4 class="mb-2 font-bold text-gray-700">Select Dosage</h4>
              <div class="flex gap-2">
                <button
                  v-for="dosage in sildDosages"
                  :key="dosage"
                  @click="selectedSildDosage = dosage"
                  :class="
                    selectedSildDosage === dosage
                      ? 'px-4 py-2 bg-pharmaBlue-400 text-white rounded'
                      : 'px-4 py-2 border border-gray-300 rounded hover:bg-gray-50'
                  "
                >
                  {{ dosage }}
                </button>
              </div>
            </div>

            <!-- Package Size Options -->
            <div class="mb-4" v-if="sildPackageSizes.length">
              <h4 class="mb-2 font-bold text-gray-700">Select Package Size</h4>
              <div class="flex gap-2">
                <button
                  v-for="pkg in sildPackageSizes"
                  :key="pkg.count + pkg.countUnit"
                  @click="selectedSildPackage = pkg"
                  :class="
                    selectedSildPackage &&
                    selectedSildPackage.count === pkg.count &&
                    selectedSildPackage.countUnit === pkg.countUnit
                      ? 'px-4 py-2 bg-pharmaBlue-400 text-white rounded'
                      : 'px-4 py-2 border border-gray-300 rounded hover:bg-gray-50'
                  "
                >
                  {{ pkg.count }} {{ pkg.countUnit }}
                </button>
              </div>
            </div>

            <!-- Action Buttons - Side by Side -->
            <div class="flex gap-3 mt-4">
              <button
                @click="addToCart('sildenafil')"
                class="w-full flex items-center justify-center gap-3 px-6 py-3.5 bg-pharmaBlue-400 text-white text-sm font-semibold rounded-md hover:bg-pharmaBlue-500 transition-all duration-200 focus:outline-none focus:ring-3 focus:ring-pharmaBlue-300 focus:ring-offset-2 shadow-md hover:shadow-lg"
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
              <a href="/transfer-prescription" class="flex-1">
                <button
                  class="w-full bg-white border-2 border-pharmaBlue-400 text-pharmaBlue-400 py-3 px-4 rounded-md hover:bg-pharmaBlue-50 transition font-medium flex items-center justify-center gap-2"
                >
                  <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                    />
                  </svg>
                  Transfer Prescription
                </button>
              </a>
            </div>
          </div>

          <!-- Tadalafil Card -->
          <div
            class="w-full md:max-w-xl bg-white/95 rounded-xl shadow-lg p-6 backdrop-blur-sm"
          >
            <div class="flex items-center gap-4 mb-6">
              <div
                class="w-12 h-12 bg-pharmaBlue-400 rounded-full flex items-center justify-center"
              >
                <svg
                  class="w-6 h-6 text-white"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <rect
                    x="3"
                    y="8"
                    width="18"
                    height="8"
                    rx="4"
                    stroke-width="2"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v8"
                  />
                </svg>
              </div>
              <div>
                <h3 class="text-xl font-bold text-gray-800">Tadalafil</h3>
                <p class="text-gray-600">Generic For: Cialis</p>
              </div>
            </div>

            <!-- Generic Price Display -->
            <div class="grid grid-cols-2 gap-4 mb-4">
              <div class="border border-gray-200 rounded-lg p-4 bg-green-50">
                <span class="text-sm text-gray-500">Our Generic Price</span>
                <div class="font-bold text-green-600">
                  ${{ currentPriceMedTwo }}
                </div>
              </div>
            </div>

            <!-- Dosage Options -->
            <div class="mb-4">
              <h4 class="mb-2 font-bold text-gray-700">Select Dosage</h4>
              <div class="flex gap-2">
                <button
                  v-for="dosage in tadDosages"
                  :key="dosage"
                  @click="selectedTadDosage = dosage"
                  :class="
                    selectedTadDosage === dosage
                      ? 'px-4 py-2 bg-pharmaBlue-400 text-white rounded'
                      : 'px-4 py-2 border border-gray-300 rounded hover:bg-gray-50'
                  "
                >
                  {{ dosage }}
                </button>
              </div>
            </div>

            <!-- Package Size Options -->
            <div class="mb-4" v-if="tadPackageSizes.length">
              <h4 class="mb-2 font-bold text-gray-700">Select Package Size</h4>
              <div class="flex gap-2">
                <button
                  v-for="pkg in tadPackageSizes"
                  :key="pkg.count + pkg.countUnit"
                  @click="selectedTadPackage = pkg"
                  :class="
                    selectedTadPackage &&
                    selectedTadPackage.count === pkg.count &&
                    selectedTadPackage.countUnit === pkg.countUnit
                      ? 'px-4 py-2 bg-pharmaBlue-400 text-white rounded'
                      : 'px-4 py-2 border border-gray-300 rounded hover:bg-gray-50'
                  "
                >
                  {{ pkg.count }} {{ pkg.countUnit }}
                </button>
              </div>
            </div>

            <!-- Action Buttons - Side by Side -->
            <div class="flex gap-3 mt-4">
              <button
                @click="addToCart('tadalafil')"
                class="w-full flex items-center justify-center gap-3 px-6 py-3.5 bg-pharmaBlue-400 text-white text-sm font-semibold rounded-md hover:bg-pharmaBlue-500 transition-all duration-200 focus:outline-none focus:ring-3 focus:ring-pharmaBlue-300 focus:ring-offset-2 shadow-md hover:shadow-lg"
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
              <a href="/transfer-prescription" class="flex-1">
                <button
                  class="w-full bg-white border-2 border-pharmaBlue-400 text-pharmaBlue-400 py-3 px-4 rounded-md hover:bg-pharmaBlue-50 transition font-medium flex items-center justify-center gap-2"
                >
                  <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                    />
                  </svg>
                  Transfer Prescription
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <MedLandingHowItWorksContainer />
    <MedLandingBenefitsContainer />
    <SocialProofContainer />
    <!-- google reviews widget -->
    <AboveFooterCTAContainer />
    <NewFooter />

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

<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useCartStore } from "~/composables/useCartStore";
import ToastNotification from "~/components/ToastNotification.vue";
import MedLandingNavigation from "~/components/layout/medLanding/medLandingNavigation.vue";
import DiscountBanner from "~/components/discountBanner.vue";
import MedLandingHeroSectionContent from "~/components/layout/medLanding/medLandingHeroSectionContent.vue";
import MedLandingHowItWorksContainer from "~/components/layout/medLanding/medLandingHowItWorksContainer.vue";
import MedLandingBenefitsContainer from "~/components/layout/medLanding/medLandingBenefitsContainer.vue";
import SocialProofContainer from "~/components/layout/socialProofContainer.vue";
import AboveFooterCTAContainer from "~/components/layout/medLanding/aboveFooterCTAContainer.vue";
// import GoogleReviewsWidget from "~/components/googleReviewsWidget.vue";
import NewFooter from "~/components/layout/newFooter.vue";
import { useNuxtData } from "#app";

const router = useRouter();

// Toast notification state
const showToast = ref(false);
const toastTitle = ref("");
const toastMessage = ref("");
const toastType = ref<"success" | "error">("success");

const store = useCartStore();

const handlePrescriptionTransfer = (medication = "") => {
  router.push({
    path: "/transfer-prescription-start",
    query: medication ? { medication } : undefined,
  });
};

const handleFloatingCTA = () => {
  handlePrescriptionTransfer();
};

const showFloatingCTA = ref(false);
onMounted(() => {
  window.addEventListener("scroll", () => {
    showFloatingCTA.value = window.scrollY > 500;
  });
});

// ----- Fetch Medications Data -----
const SILDENAFIL = ref(null);
const { data: SILDENAFIL_DATA } = await useFetch("/api/medications/findMed", {
  method: "GET",
  query: { searchTerm: "Sildenafil", exact: true },
  key: "SILDENAFIL_DATA",
});
SILDENAFIL.value = SILDENAFIL_DATA.value;

const TADALAFIL = ref(null);
const { data: TADALAFIL_DATA } = await useFetch("/api/medications/findMed", {
  method: "GET",
  query: { searchTerm: "Tadalafil", exact: true },
  key: "TADALAFIL_DATA",
});
TADALAFIL.value = TADALAFIL_DATA.value;

// ----- Interactive Selection for Sildenafil -----
// Reactive selections for Sildenafil
const selectedSildDosage = ref("");
const selectedSildPackage = ref<{ count: number; countUnit: string } | null>(
  null,
);

// Compute unique dosages for Sildenafil
const sildDosages = computed(() => {
  if (!SILDENAFIL.value?.[0]?.options) return [];
  const dosages: string[] = [];
  SILDENAFIL.value[0].options.forEach((option: any) => {
    if (!dosages.includes(option.size)) {
      dosages.push(option.size);
    }
  });
  return dosages;
});

// Compute package sizes (count and countUnit) for the selected dosage
const sildPackageSizes = computed(() => {
  if (!SILDENAFIL.value?.[0]?.options) return [];
  if (!selectedSildDosage.value) return [];
  const pkgs: { count: number; countUnit: string }[] = [];
  SILDENAFIL.value[0].options.forEach((option: any) => {
    if (option.size === selectedSildDosage.value) {
      // Check if this package (by count and countUnit) is already added
      if (
        !pkgs.some(
          (pkg) =>
            pkg.count === option.count && pkg.countUnit === option.countUnit,
        )
      ) {
        pkgs.push({ count: option.count, countUnit: option.countUnit });
      }
    }
  });
  return pkgs;
});

// Compute the selected option for Sildenafil
const sildSelectedOption = computed(() => {
  if (!selectedSildDosage.value || !selectedSildPackage.value) return null;
  return SILDENAFIL.value[0].options.find(
    (option: any) =>
      option.size === selectedSildDosage.value &&
      option.count === selectedSildPackage.value!.count &&
      option.countUnit === selectedSildPackage.value!.countUnit,
  );
});

// ----- Interactive Selection for Tadalafil -----
// Reactive selections for Tadalafil
const selectedTadDosage = ref("");
const selectedTadPackage = ref<{ count: number; countUnit: string } | null>(
  null,
);

// Compute unique dosages for Tadalafil
const tadDosages = computed(() => {
  if (!TADALAFIL.value?.[0]?.options) return [];
  const dosages: string[] = [];
  TADALAFIL.value[0].options.forEach((option: any) => {
    if (!dosages.includes(option.size)) {
      dosages.push(option.size);
    }
  });
  return dosages;
});

// Compute package sizes (count and countUnit) for the selected dosage
const tadPackageSizes = computed(() => {
  if (!TADALAFIL.value?.[0]?.options) return [];
  if (!selectedTadDosage.value) return [];
  const pkgs: { count: number; countUnit: string }[] = [];
  TADALAFIL.value[0].options.forEach((option: any) => {
    if (option.size === selectedTadDosage.value) {
      if (
        !pkgs.some(
          (pkg) =>
            pkg.count === option.count && pkg.countUnit === option.countUnit,
        )
      ) {
        pkgs.push({ count: option.count, countUnit: option.countUnit });
      }
    }
  });
  return pkgs;
});

// Compute the selected option for Tadalafil
const tadSelectedOption = computed(() => {
  if (!selectedTadDosage.value || !selectedTadPackage.value) return null;
  return TADALAFIL.value[0].options.find(
    (option: any) =>
      option.size === selectedTadDosage.value &&
      option.count === selectedTadPackage.value!.count &&
      option.countUnit === selectedTadPackage.value!.countUnit,
  );
});

// ----- Computed Prices -----
const currentPriceMedOne = computed(() => {
  return sildSelectedOption.value ? sildSelectedOption.value.price : "N/A";
});

const currentPriceMedTwo = computed(() => {
  return tadSelectedOption.value ? tadSelectedOption.value.price : "N/A";
});

// ----- Add to Cart Function -----
async function addToCart(medicationType: "sildenafil" | "tadalafil") {
  let selectedOption = null;
  let medicationData = null;
  let selectedDosage = "";
  let selectedPackage = null;

  if (medicationType === "sildenafil") {
    selectedOption = sildSelectedOption.value;
    medicationData = SILDENAFIL.value?.[0];
    selectedDosage = selectedSildDosage.value;
    selectedPackage = selectedSildPackage.value;
  } else {
    selectedOption = tadSelectedOption.value;
    medicationData = TADALAFIL.value?.[0];
    selectedDosage = selectedTadDosage.value;
    selectedPackage = selectedTadPackage.value;
  }

  // Validate selections first
  if (!selectedDosage || !selectedPackage || !selectedOption) {
    toastTitle.value = "Selection Required";
    toastMessage.value = "Please select both dosage and quantity";
    toastType.value = "error";
    showToast.value = true;
    return;
  }

  const item = {
    medication: {
      name: medicationData.name,
      count: selectedPackage.count,
      countUnit: selectedPackage.countUnit,
      size: selectedDosage,
      price: parseFloat(selectedOption.price || "0"),
    },
    quantity: 1,
  };

  try {
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
      toastMessage.value = `${medicationData.name} (${selectedPackage.count} ${selectedPackage.countUnit}) added to cart`;
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

// ----- Set Default Selections When Data Loads -----
watch(
  sildDosages,
  (newDosages) => {
    if (newDosages.length > 0 && !selectedSildDosage.value) {
      selectedSildDosage.value = newDosages[0];
    }
  },
  { immediate: true },
);

watch(
  sildPackageSizes,
  (newPkgs) => {
    if (newPkgs.length > 0 && !selectedSildPackage.value) {
      selectedSildPackage.value = newPkgs[0];
    }
  },
  { immediate: true },
);

watch(
  tadDosages,
  (newDosages) => {
    if (newDosages.length > 0 && !selectedTadDosage.value) {
      selectedTadDosage.value = newDosages[0];
    }
  },
  { immediate: true },
);

watch(
  tadPackageSizes,
  (newPkgs) => {
    if (newPkgs.length > 0 && !selectedTadPackage.value) {
      selectedTadPackage.value = newPkgs[0];
    }
  },
  { immediate: true },
);
</script>

<style scoped>
a {
  position: relative;
}

a:hover span {
  transform: scaleX(1);
}

a span {
  transform: scaleX(0);
  transition: transform 0.3s ease;
}
</style>
