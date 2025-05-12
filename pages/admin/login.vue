<template>
  <div class="w-screen h-screen flex justify-center items-center">
    <div
      class="border border-gray-400 shadow-lg shadow-slate-400 bg-gray-50 rounded flex flex-col justify-center items-center gap-8"
    >
      <div
        class="text-2xl font-semibold text-white bg-orange-400 rounded-t p-4"
      >
        Hampshire Pharmacy Dashboard
      </div>
      <div v-if="errorMessage" class="text-red-600">
        {{ errorMessage }}
      </div>
      <form action="" @submit.prevent="trylog">
        <div class="flex flex-col w-full justify-center items-center gap-6">
          <div>
            <input
              class="px-3 py-1 bg-slate-100 rounded shadow-md shadow-slate-50 border border-gray-700"
              placeholder="Email Address"
              type="email"
              v-model="email"
            />
          </div>
          <div>
            <input
              class="px-3 py-1 bg-slate-100 rounded shadow-md shadow-slate-50 border border-gray-700"
              placeholder="password"
              type="password"
              v-model="password"
            />
          </div>
        </div>
      </form>
      <button
        @click.prevent="trylog"
        class="bg-blue-400 text-white text-xl font-bold w-full p-4 rounded-b hover:bg-blue-600"
      >
        Login
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Define reactive variables for form inputs and error message
const email = ref("");
const password = ref("");
const errorMessage = ref("");

// Define the signup function to trigger the mutation
async function trylog() {
  try {
    const res = await $fetch("/api/auth/login", {
      method: "POST",
      body: {
        email: email.value,
        password: password.value,
      },
    });
    // console.log(res)
    if (res.loggedIn) {
      return navigateTo("/admin/medIndex");
    }
  } catch (e) {
    errorMessage.value = "Wrong Username and Password combination";
  }
}
</script>

<style scoped></style>
