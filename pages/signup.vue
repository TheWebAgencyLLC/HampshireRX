<script setup lang="ts">
// State variables for form data
import { useLogin } from "~/composables/useLogin";
import { useAuthStore } from "~/stores/useAuthStore";

const signupForm = reactive({
  email: "",
  password: "",
  confirmPassword: "",
  firstName: "",
  lastName: "",
  phone: "",
  address: {
    street: "",
    city: "",
    state: "",
    zipCode: "",
  },
});

const route = useRoute();

const errorMessage = ref<string | undefined>(undefined);

// Track the current step
const currentStep = ref(1);
const totalSteps = 2;

// Move to next step if validation passes
const nextStep = () => {
  if (currentStep.value < totalSteps) {
    // Here you would typically validate the current step
    currentStep.value++;
  }
};

// Go back to previous step
const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--;
  }
};

const auth = useAuthStore();

// Progress percentage calculation
const progressPercentage = computed(() => {
  return ((currentStep.value - 1) / (totalSteps - 1)) * 100;
});

async function handleSignup() {
  try {
    const res = await $fetch(`/api/auth/signup`, {
      method: "POST",
      body: { ...signupForm },
    });
    //@ts-ignore
    if (res.registered) {
      errorMessage.value = "";
      try {
        const loginRes = await $fetch("/api/auth/login", {
          method: "POST",
          body: {
            email: signupForm.email,
            password: signupForm.password,
          },
        });
        if (loginRes.loggedIn && loginRes.token) {
          auth.setAuth(loginRes.token, loginRes.user, loginRes.name);
          if (route.query.redirect) {
            // Handle redirect properly
            const redirectPath = Array.isArray(route.query.redirect)
              ? route.query.redirect[0]
              : route.query.redirect;

            // Decode the redirect path in case it has encoded characters
            const decodedPath = decodeURIComponent(redirectPath);

            // Ensure the path starts with / and avoid double slashes
            const normalizedPath = decodedPath.startsWith("/")
              ? decodedPath
              : `/${decodedPath}`;

            return await navigateTo(normalizedPath);
          }
          return navigateTo("/"); //if successful, redirect.
        }
      } catch (e: any) {
        errorMessage.value = e.statusMessage; //update error text
      }
    }
  } catch (e: any) {
    if (e.statusCode == "409") {
      currentStep.value = 1;
      errorMessage.value = "Email already exists";
    }
    //console.log(e.message);
  }
}
</script>

<template>
  <div class="flex flex-col min-h-screen bg-[#F7F7F5]">
    <div class="flex justify-center items-center p-8 flex-grow">
      <div
        class="w-full max-w-4xl bg-white rounded-lg shadow-xl overflow-hidden"
      >
        <!-- Progress bar -->
        <div class="w-full bg-gray-200 h-1">
          <div
            class="bg-indigo-600 h-1 transition-all duration-300"
            :style="`width: ${progressPercentage}%`"
          ></div>
        </div>

        <div class="p-8">
          <div class="mb-6">
            <a
              href="/"
              class="inline-flex items-center text-sm text-gray-600 hover:text-indigo-600 transition-colors"
            >
              <svg
                class="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                ></path>
              </svg>
              Return to Home
            </a>
          </div>
          <div class="mb-8">
            <h1 class="text-3xl font-bold text-gray-900 mb-2">
              Create Your Account
            </h1>
            <p class="text-gray-600">
              {{
                currentStep === 1
                  ? "Set up your login credentials"
                  : "Tell us about yourself"
              }}
            </p>
          </div>

          <!-- Step 1: Account Information -->
          <div v-if="currentStep === 1" class="space-y-6">
            <div class="flex flex-col">
              <label for="email" class="text-sm font-medium text-gray-700 mb-1"
                >Email
                <span v-if="errorMessage" class="text-red-500"
                  >• User Already Exists.
                </span></label
              >
              <input
                v-model="signupForm.email"
                id="email"
                placeholder="Enter your email"
                :class="[
                  'border rounded-md py-2 px-3 bg-white shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500',
                  errorMessage ? 'border-red-500' : 'border-gray-300',
                ]"
                type="email"
              />
            </div>

            <div class="flex flex-col">
              <label
                for="password"
                class="text-sm font-medium text-gray-700 mb-1"
                >Password</label
              >
              <input
                v-model="signupForm.password"
                id="password"
                placeholder="Create a password"
                class="border border-gray-300 rounded-md py-2 px-3 bg-white shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                type="password"
              />
              <p class="mt-1 text-xs text-gray-500">
                Password must be at least 8 characters long
              </p>
            </div>

            <div class="flex flex-col">
              <label
                for="confirmPassword"
                class="text-sm font-medium text-gray-700 mb-1"
                >Confirm Password</label
              >
              <input
                v-model="signupForm.confirmPassword"
                id="confirmPassword"
                placeholder="Confirm your password"
                class="border border-gray-300 rounded-md py-2 px-3 bg-white shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                type="password"
              />
            </div>

            <div>
              <button
                @click="nextStep"
                class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              >
                Continue
              </button>
            </div>
          </div>

          <!-- Step 2: Personal Information -->
          <div v-if="currentStep === 2" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="flex flex-col">
                <label
                  for="firstName"
                  class="text-sm font-medium text-gray-700 mb-1"
                  >First Name</label
                >
                <input
                  v-model="signupForm.firstName"
                  id="firstName"
                  placeholder="Enter your first name"
                  class="border border-gray-300 rounded-md py-2 px-3 bg-white shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  type="text"
                />
              </div>

              <div class="flex flex-col">
                <label
                  for="lastName"
                  class="text-sm font-medium text-gray-700 mb-1"
                  >Last Name</label
                >
                <input
                  v-model="signupForm.lastName"
                  id="lastName"
                  placeholder="Enter your last name"
                  class="border border-gray-300 rounded-md py-2 px-3 bg-white shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  type="text"
                />
              </div>
            </div>

            <div class="flex flex-col">
              <label for="phone" class="text-sm font-medium text-gray-700 mb-1"
                >Phone Number</label
              >
              <input
                v-model="signupForm.phone"
                id="phone"
                placeholder="Enter your phone number"
                class="border border-gray-300 rounded-md py-2 px-3 bg-white shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                type="tel"
              />
            </div>

            <div class="flex flex-col">
              <label
                for="address"
                class="text-sm font-medium text-gray-700 mb-1"
                >Address</label
              >
              <input
                v-model="signupForm.address.street"
                id="address"
                placeholder="Enter your street address"
                class="border border-gray-300 rounded-md py-2 px-3 bg-white shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                type="text"
              />
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div class="flex flex-col">
                <label for="city" class="text-sm font-medium text-gray-700 mb-1"
                  >City</label
                >
                <input
                  v-model="signupForm.address.city"
                  id="city"
                  placeholder="City"
                  class="border border-gray-300 rounded-md py-2 px-3 bg-white shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  type="text"
                />
              </div>

              <div class="flex flex-col">
                <label
                  for="state"
                  class="text-sm font-medium text-gray-700 mb-1"
                  >State</label
                >
                <input
                  v-model="signupForm.address.state"
                  id="state"
                  placeholder="State"
                  class="border border-gray-300 rounded-md py-2 px-3 bg-white shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  type="text"
                />
              </div>

              <div class="flex flex-col">
                <label
                  for="zipCode"
                  class="text-sm font-medium text-gray-700 mb-1"
                  >ZIP Code</label
                >
                <input
                  v-model="signupForm.address.zipCode"
                  id="zipCode"
                  placeholder="ZIP"
                  class="border border-gray-300 rounded-md py-2 px-3 bg-white shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  type="text"
                />
              </div>
            </div>

            <div class="flex space-x-4">
              <button
                @click="prevStep"
                class="w-1/3 flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              >
                Back
              </button>

              <button
                @click.prevent="handleSignup"
                class="w-2/3 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              >
                Create Account
              </button>
            </div>
          </div>

          <div class="mt-6 text-center">
            <p class="text-sm text-gray-600">
              Already have an account?
              <NuxtLink
                to="/login"
                class="text-indigo-600 hover:text-indigo-500 font-medium"
              >
                Sign in
              </NuxtLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
