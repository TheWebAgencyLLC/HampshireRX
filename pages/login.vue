<script setup lang="ts">
import { useAuthStore } from "~/stores/useAuthStore";

const auth = useAuthStore();

// State variable to hold our form data
const authForm = reactive({
  username: "",
  password: "",
});

//error text
const errorText = ref(undefined);

//submit login

const submitForm = async () => {
  try {
    const res = await $fetch("/api/auth/login", {
      method: "POST",
      body: {
        email: authForm.username,
        password: authForm.password,
      },
    });
    if (res.loggedIn && res.token) {
      auth.setAuth(res.token, res.user);
      return navigateTo("/"); //if successful, redirect.
    }
  } catch (e: any) {
    errorText.value = e.statusMessage; //update error text
  }
};
</script>

<template>
  <div class="flex flex-col min-h-screen bg-[#F7F7F5]">
    <div class="flex justify-center items-center p-8 flex-grow">
      <div
        class="flex w-full max-w-4xl bg-white rounded-lg shadow-xl overflow-hidden"
      >
        <div
          class="w-1/2 bg-cover bg-center hidden md:block"
          style="
            background-image: url(&quot;/images/undraw_automobile_repair_ywci.webp&quot;);
          "
        ></div>

        <div class="w-full md:w-1/2 p-8">
          <div class="mb-8">
            <h1 class="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
            <p class="text-gray-600">Sign in to access your account</p>
            <p class="text-red-500" v-if="errorText">{{ errorText }}</p>
          </div>

          <form>
            <div class="space-y-6">
              <div class="flex flex-col">
                <label
                  for="username"
                  class="text-sm font-medium text-gray-700 mb-1"
                  >Email</label
                >
                <input
                  v-model="authForm.username"
                  id="username"
                  placeholder="Enter your email"
                  class="border border-gray-300 rounded-md py-2 px-3 bg-white shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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
                  v-model="authForm.password"
                  id="password"
                  placeholder="Enter your password"
                  class="border border-gray-300 rounded-md py-2 px-3 bg-white shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  type="password"
                />
              </div>

              <div class="flex justify-between items-center">
                <div class="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label
                    for="remember-me"
                    class="ml-2 block text-sm text-gray-700"
                    >Remember me</label
                  >
                </div>
                <div class="text-sm">
                  <a href="#" class="text-indigo-600 hover:text-indigo-500"
                    >Forgot password?</a
                  >
                </div>
              </div>

              <div>
                <button
                  @click.prevent="submitForm"
                  class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                >
                  Sign in
                </button>
              </div>

              <div class="text-center">
                <p class="text-sm text-gray-600">
                  Don't have an account?
                  <NuxtLink
                    to="/signup"
                    class="text-indigo-600 hover:text-indigo-500 font-medium"
                  >
                    Sign up
                  </NuxtLink>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
