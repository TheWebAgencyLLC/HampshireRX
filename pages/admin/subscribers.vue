<script setup lang="ts">
definePageMeta({
  layout: "admin",
  middleware: "auth",
});

const headers = useRequestHeaders(["cookie"]);
const { data: subscribers, refresh } = await useFetch("/api/newsletter/subscribers", { headers });

const formattedSubscribers = computed(() => {
  if (!subscribers.value || !Array.isArray(subscribers.value)) return [];
  return subscribers.value.map((s: any) => ({
    ...s,
    subscribedAt: new Date(s.subscribedAt).toLocaleString("en-US"),
  }));
});

function downloadCSV() {
  window.location.href = "/api/newsletter/export";
}
</script>

<template>
  <div class="flex flex-col items-center gap-6 mt-10 px-4">
    <div class="w-full max-w-4xl">
      <div class="flex justify-between items-center mb-4">
        <div>
          <h1 class="text-2xl font-bold">Newsletter Subscribers</h1>
          <p class="text-gray-500 text-sm mt-1">
            {{ formattedSubscribers.length }} total subscriber{{
              formattedSubscribers.length !== 1 ? "s" : ""
            }}
          </p>
        </div>
        <button
          @click="downloadCSV"
          class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow-md text-sm font-medium transition-colors"
        >
          Download CSV
        </button>
      </div>

      <div v-if="formattedSubscribers.length === 0" class="text-gray-400 italic text-center py-12">
        No subscribers yet.
      </div>

      <div v-else class="overflow-x-auto rounded border border-gray-200 shadow-sm">
        <table class="w-full text-sm text-left">
          <thead class="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th class="px-4 py-3">#</th>
              <th class="px-4 py-3">First Name</th>
              <th class="px-4 py-3">Email</th>
              <th class="px-4 py-3">Subscribed At</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(sub, index) in formattedSubscribers"
              :key="sub._id"
              class="border-t border-gray-100 hover:bg-gray-50"
            >
              <td class="px-4 py-3 text-gray-400">{{ index + 1 }}</td>
              <td class="px-4 py-3">{{ sub.firstName || "—" }}</td>
              <td class="px-4 py-3 font-medium">{{ sub.email }}</td>
              <td class="px-4 py-3 text-gray-500">{{ sub.subscribedAt }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
