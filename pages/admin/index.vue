<script setup lang="ts">
definePageMeta({
  layout: "admin",
  middleware: "auth",
});
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center px-4">
    <h1 class="text-3xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
    <p class="text-gray-500 mb-10">What would you like to manage?</p>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl">
      <NuxtLink
        to="/admin/medIndex"
        class="flex flex-col items-center justify-center gap-3 bg-white border-2 border-blue-100 hover:border-blue-400 rounded-xl p-10 shadow-sm hover:shadow-md transition-all group"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 text-blue-400 group-hover:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <span class="text-lg font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">Medications</span>
        <span class="text-sm text-gray-400 text-center">Manage the medication catalog and showcase items</span>
      </NuxtLink>

      <NuxtLink
        to="/admin/subscribers"
        class="flex flex-col items-center justify-center gap-3 bg-white border-2 border-orange-100 hover:border-orange-400 rounded-xl p-10 shadow-sm hover:shadow-md transition-all group"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 text-orange-400 group-hover:text-orange-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        <span class="text-lg font-semibold text-gray-700 group-hover:text-orange-600 transition-colors">Subscribers</span>
        <span class="text-sm text-gray-400 text-center">View and export newsletter mailing list</span>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped></style>
