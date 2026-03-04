<template>
  <div>
    <form v-if="!submitted" @submit.prevent="submit" class="flex flex-col gap-2">
      <input
        v-model="firstName"
        type="text"
        placeholder="First name (optional)"
        class="px-3 py-1.5 rounded text-gray-800 text-sm border border-gray-300 focus:outline-none focus:border-orange-400"
      />
      <input
        v-model="email"
        type="email"
        placeholder="Email address"
        required
        class="px-3 py-1.5 rounded text-gray-800 text-sm border border-gray-300 focus:outline-none focus:border-orange-400"
      />
      <button
        type="submit"
        :disabled="loading"
        class="px-3 py-1.5 rounded text-sm font-semibold text-white bg-orange-500 hover:bg-orange-600 disabled:opacity-60 transition-colors"
      >
        {{ loading ? "Subscribing..." : "Subscribe" }}
      </button>
      <p v-if="error" class="text-red-400 text-xs">{{ error }}</p>
    </form>
    <p v-else class="text-green-400 text-sm font-medium">
      You're subscribed! Thank you.
    </p>
  </div>
</template>

<script setup>
const firstName = ref("");
const email = ref("");
const loading = ref(false);
const submitted = ref(false);
const error = ref("");

async function submit() {
  loading.value = true;
  error.value = "";
  try {
    await $fetch("/api/newsletter/subscribe", {
      method: "POST",
      body: { email: email.value, firstName: firstName.value },
    });
    submitted.value = true;
  } catch (e) {
    if (e.data?.statusMessage === "Already subscribed") {
      error.value = "That email is already subscribed.";
    } else {
      error.value = "Something went wrong. Please try again.";
    }
  } finally {
    loading.value = false;
  }
}
</script>
