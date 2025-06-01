<template>
  <header class="bg-[#F7F7F5] text-black py-4">
    <div class="mx-auto px-4">
      <div class="flex items-center justify-between">
        <div class="">
          <NuxtLink to="/" class="">
            <img
              src="~/public/images/logos/primaryWideLogo.webp"
              alt="Hampshire Pharmacy Logo"
              class="w-64"
            />
          </NuxtLink>
        </div>

        <nav class="hidden sm:flex items-center space-x-6 xl:inline-flex">
          <NuxtLink
            v-if="currentRoute !== '/'"
            to="/"
            @click="handleNavClick('Home', '/')"
            class="text-black hover:text-orange-500 transition-colors duration-200 relative"
          >
            Home
          </NuxtLink>
          <NuxtLink
            v-if="currentRoute !== '/about'"
            to="/about"
            @click="handleNavClick('About', '/about')"
            class="text-black hover:text-orange-500 transition-colors duration-200 relative"
          >
            About
          </NuxtLink>
          <NuxtLink
            v-if="currentRoute !== '/privacy'"
            to="/privacy"
            @click="handleNavClick('Privacy', '/privacy')"
            class="text-black hover:text-orange-500 transition-colors duration-200 relative"
          >
            Privacy
          </NuxtLink>
          <NuxtLink
            v-if="currentRoute !== '/faq'"
            to="/faq"
            @click="handleNavClick('FAQ', '/faq')"
            class="text-black hover:text-orange-500 transition-colors duration-200 relative"
          >
            FAQ
          </NuxtLink>
          <a
            v-if="currentRoute !== '/transfer-prescription'"
            href="/transfer-prescription"
            @click="
              handleNavClick('Prescription Transfer', '/transfer-prescription')
            "
            class="text-black hover:text-orange-500 transition-colors duration-200 relative"
          >
            Prescription Transfer
          </a>

          <!-- Animated Cart Icon -->
          <NuxtLink to="/cart" class="relative">
            <ClientOnly>
              <img
                :src="
                  isCartAnimating
                    ? '/images/icons8-cart.gif'
                    : '/images/icons8-cart-24.png'
                "
                alt="Shopping Cart"
                :key="mobileCartIconKey"
              />
              <template #fallback>
                <img src="/images/icons8-cart.gif" alt="Shopping Cart" />
              </template>
            </ClientOnly>
            <div
              v-if="cartCount > 0"
              class="absolute -top-3 -right-4 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
            >
              {{ cartCount }}
            </div>
          </NuxtLink>

          <!-- User Dropdown -->
          <div class="relative" ref="userDropdown">
            <!-- Login Link (when not logged in) -->
            <NuxtLink
              v-if="!isLoggedIn"
              to="/login"
              class="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-1.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                />
              </svg>
              Login
            </NuxtLink>

            <!-- User Dropdown Button (when logged in) -->
            <button
              v-if="isLoggedIn"
              @click="toggleUserDropdown"
              class="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-1.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              Hi, {{ name || "User" }}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 ml-1 transition-transform duration-200"
                :class="{ 'rotate-180': isUserDropdownOpen }"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <!-- Dropdown Menu -->
            <Transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <div
                v-if="isLoggedIn && isUserDropdownOpen"
                class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5"
              >
                <NuxtLink
                  to="/profile"
                  @click="handleNavClick('Profile', '/profile')"
                  class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  Profile
                </NuxtLink>
                <button
                  @click="handleLogout"
                  class="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors text-left"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Logout
                </button>
              </div>
            </Transition>
          </div>

          <NuxtLink
            to="https://www.facebook.com/HampshirePharmacy/"
            target="_blank"
            rel="noopener noreferrer"
            @click="
              handleNavClick(
                'Facebook',
                'https://www.facebook.com/HampshirePharmacy/',
              )
            "
            class="text-black hover:text-orange-500 transition-colors duration-200"
          >
            <img
              class="hover:opacity-75"
              src="/public/images/logos/Facebook_Logo_Primary.png"
              alt="Facebook Icon"
              width="24"
              height="24"
            />
          </NuxtLink>
        </nav>

        <button @click="toggleMobileMenu" class="sm:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-black"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile menu drawer -->
    <Transition
      enter-active-class="transition-transform duration-300 ease-out font-lato"
      enter-from-class="translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="transition-transform duration-300 ease-in"
      leave-from-class="translate-x-0"
      leave-to-class="translate-x-full"
    >
      <div
        v-if="isMobileMenuOpen"
        class="fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 overflow-y-auto flex flex-col"
      >
        <!-- Close button -->
        <button
          @click="toggleMobileMenu"
          class="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div class="p-6">
          <NuxtLink to="/" @click="handleNavClick('Home', '/')" class="block">
            <img
              src="~/public/images/logos/primaryWideLogo.webp"
              alt="Hampshire Pharmacy Logo"
              class="w-48"
            />
          </NuxtLink>
        </div>

        <!-- Navigation Links -->
        <nav class="flex flex-col px-6 pt-2 flex-grow">
          <NuxtLink
            v-for="(link, index) in navigationLinks"
            :key="index"
            :to="link.to"
            @click="handleNavClick(link.name, link.to)"
            class="py-4 text-gray-800 hover:text-pharmaBlue-400 text-lg font-medium transition-colors duration-200 flex items-center justify-between"
          >
            {{ link.name }}
            <svg
              class="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </NuxtLink>

          <!-- Cart Link -->
          <NuxtLink
            to="/cart"
            @click="handleNavClick('Cart', '/cart')"
            class="py-4 text-gray-800 hover:text-pharmaBlue-400 text-lg font-medium transition-colors duration-200 flex items-center justify-between"
          >
            <div class="flex items-center">
              <ClientOnly>
                <img
                  :src="
                    isCartAnimating
                      ? '/images/icons8-cart.gif'
                      : '/images/icons8-cart-24.png'
                  "
                  alt="Shopping Cart"
                  :key="mobileCartIconKey"
                />
                <template #fallback>
                  <img src="/images/icons8-cart.gif" alt="Shopping Cart" />
                </template>
              </ClientOnly>
              <div
                v-if="cartCount > 0"
                class="ml-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
              >
                {{ cartCount }}
              </div>
            </div>
            <svg
              class="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </NuxtLink>

          <!-- Mobile User Section -->
          <div v-if="isLoggedIn" class="py-4">
            <div class="text-gray-800 text-lg font-medium mb-2">
              Hi, {{ userName || "User" }}
            </div>
            <div class="ml-4 space-y-2">
              <NuxtLink
                to="/profile"
                @click="handleNavClick('Profile', '/profile')"
                class="block py-2 text-gray-600 hover:text-pharmaBlue-400 transition-colors duration-200 flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                Profile
              </NuxtLink>
              <button
                @click="handleLogout"
                class="block py-2 text-gray-600 hover:text-pharmaBlue-400 transition-colors duration-200 flex items-center w-full text-left"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Logout
              </button>
            </div>
          </div>

          <!-- Login Link for Mobile -->
          <NuxtLink
            v-if="!isLoggedIn"
            to="/login"
            @click="handleNavClick('Login', '/login')"
            class="py-4 text-gray-800 hover:text-pharmaBlue-400 text-lg font-medium transition-colors duration-200 flex items-center justify-between"
          >
            <div class="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                />
              </svg>
              Login
            </div>
            <svg
              class="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </NuxtLink>
        </nav>

        <!-- Bottom Info Section -->
        <div class="p-4">
          <div class="mt-auto bg-gray-100 rounded-lg">
            <div class="p-8">
              <h2 class="text-2xl font-semibold text-gray-900 mb-3">
                Send your patient's prescriptions to us.
              </h2>
              <p class="text-gray-600 mb-6">
                We offer best in class pharmacy fulfillment services to partners
                of all sizes.
              </p>
              <NuxtLink
                to="/about"
                class="inline-flex items-center text-blue-500 hover:text-blue-600 font-medium"
              >
                Learn More
                <svg
                  class="w-5 h-5 ml-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7 17L17 7M17 7H7M17 7V17"
                  />
                </svg>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Backdrop -->
    <Transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-50"
      leave-active-class="transition-opacity duration-300"
      leave-from-class="opacity-50"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isMobileMenuOpen"
        @click="toggleMobileMenu"
        class="fixed inset-0 bg-black/75 z-40"
      ></div>
    </Transition>
  </header>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import { useCartStore } from "~/composables/useCartStore";
import { useCheckAuth } from "~/composables/useCheckAuth.js";

const gtm = useGTM();
const route = useRoute();
const currentRoute = route.path;
const isMobileMenuOpen = ref(false);
const isUserDropdownOpen = ref(false);
const userDropdown = ref(null);
const { isLoggedIn } = await useCheckAuth();

// This is a placeholder - replace with our actual user data from auth
const { name } = useAuthStore();

const isCartAnimating = ref(false);
const cartIconKey = ref(0);
const mobileCartIconKey = ref(0);

const navigationLinks = [
  { name: "Home", to: "/" },
  { name: "About", to: "/about" },
  { name: "Privacy", to: "/privacy" },
  { name: "FAQ", to: "/faq" },
  { name: "Prescription Transfer", to: "/transfer-prescription" },
  { name: "Facebook", to: "https://www.facebook.com/HampshirePharmacy/" },
];

const trackNavigationInteraction = (linkName, navigatingTo, navigatingFrom) => {
  gtm.trackEvent({
    event: "navigation_interaction",
    linkName: linkName,
    navigatingTo: navigatingTo,
    navigatingFrom: navigatingFrom,
  });
};

const handleNavClick = (linkName, navigatingTo) => {
  trackNavigationInteraction(linkName, navigatingTo, currentRoute);
  isMobileMenuOpen.value = false;
  isUserDropdownOpen.value = false;
};

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
  isUserDropdownOpen.value = false;
};

const toggleUserDropdown = () => {
  isUserDropdownOpen.value = !isUserDropdownOpen.value;
};

const handleLogout = () => {
  isUserDropdownOpen.value = false;
  isMobileMenuOpen.value = false;
  useLogout();
};

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  if (userDropdown.value && !userDropdown.value.contains(event.target)) {
    isUserDropdownOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});

const { cartCount } = useCartStore();

// Function to trigger cart animation
const triggerCartAnimation = () => {
  isCartAnimating.value = true;
  cartIconKey.value += 1;
  mobileCartIconKey.value += 1;

  setTimeout(() => {
    isCartAnimating.value = false;
  }, 2000);
};

// Watch for cart count changes and trigger animation
watch(cartCount, (newCount, oldCount) => {
  if (newCount > oldCount) {
    triggerCartAnimation();
  }
});

// Expose the triggerCartAnimation function globally
const { $triggerCartAnimation } = useNuxtApp();
provide("triggerCartAnimation", triggerCartAnimation);
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
