<script setup lang="ts">
definePageMeta({
  layout: "admin",
  middleware: "auth",
});

const count = ref(0);
const medData = ref<any[]>([]);
const topMeds = ref();

const { data: meds } = useNuxtData("meds");
const { data: topFiveCache } = useNuxtData("topFive");
if (meds) {
  //@ts-ignore
  medData.value = meds;
}
if (topFiveCache) {
  topMeds.value = topFiveCache;
}
const { data } = await useFetch("/api/medications/all", {
  method: "GET",
  key: "meds",
});

const { data: topFive } = await useFetch("/api/medications/getTopFive", {
  key: "topFive",
});

//@ts-ignore
medData.value = data.value;
topMeds.value = topFive.value;
const newMeds = ref([
  { name: topMeds.value.body[0].topMedications[0].name, index: 0 },
  { name: topMeds.value.body[0].topMedications[1].name, index: 1 },
  { name: topMeds.value.body[0].topMedications[2].name, index: 2 },
  { name: topMeds.value.body[0].topMedications[3].name, index: 3 },
  { name: topMeds.value.body[0].topMedications[4].name, index: 4 },
]);

const submitTopMeds = async () => {
  try {
    const res = await $fetch("/api/medications/updateTopFive", {
      method: "POST",
      body: {
        topMedications: newMeds.value,
      },
    });
    reloadNuxtApp();
  } catch (e) {
    // Error handling
  }
};

const filterText = ref("");

const filteredMeds = computed(() => {
  const term = filterText.value.trim().toLowerCase();
  if (!term) return medData.value;
  return medData.value.filter(
    (med) => med.name && med.name.toLowerCase().includes(term),
  );
});

const newMedSubmitted = async () => {
  reloadNuxtApp();
};

const showModal = ref(false);
</script>

<template>
  <AddMedModal
    @submit="newMedSubmitted"
    v-if="showModal"
    @modal-close="showModal = false"
  />

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Page Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">
        Medication Management
      </h1>
      <p class="text-gray-600">
        Manage your pharmacy inventory and featured medications
      </p>
    </div>

    <!-- Featured Medications Section -->
    <section class="mb-10 bg-white shadow rounded-lg overflow-hidden">
      <div class="bg-gradient-to-r from-indigo-600 to-indigo-700 px-6 py-4">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-semibold text-white">Featured Medications</h2>
          <div class="text-indigo-100">Highlight your top products</div>
        </div>
      </div>

      <div class="p-6">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          <div
            class="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden"
            v-for="(med, index) in topMeds.body[0].topMedications"
            :key="index"
          >
            <div class="bg-gray-100 px-4 py-2 border-b border-gray-200">
              <label class="block text-sm font-medium text-gray-700">
                Featured Slot {{ index + 1 }}
              </label>
            </div>
            <div class="p-4">
              <select
                class="w-full border border-gray-300 rounded-md py-2 px-3 bg-white shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                v-model="newMeds[index].name"
              >
                <option>{{ med.name }}</option>
                <option v-for="m in medData" :value="m.name">
                  {{ m.name }}
                </option>
              </select>
              <div class="mt-3 flex justify-end">
                <button
                  @click="submitTopMeds"
                  v-if="newMeds[index].name !== med.name"
                  class="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Search and Filter Section -->
    <section class="mb-8">
      <div class="bg-white shadow rounded-lg p-6">
        <div
          class="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <div class="relative flex-grow max-w-lg">
            <div
              class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
            >
              <svg
                class="h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <input
              v-model="filterText"
              type="text"
              placeholder="Search medications..."
              class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <button
            @click="showModal = true"
            class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <svg
              class="-ml-1 mr-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clip-rule="evenodd"
              />
            </svg>
            Add Medication
          </button>
        </div>

        <div class="mt-4 flex items-center text-sm text-gray-600">
          <span v-if="filteredMeds.length" class="mr-2">
            <span class="font-medium text-indigo-600">{{
              filteredMeds.length
            }}</span>
            medications found
          </span>
          <span class="italic">Click on a medication card to view details</span>
        </div>
      </div>
    </section>

    <!-- Medications Grid -->
    <section>
      <!-- Empty State -->
      <div
        v-if="!filteredMeds.length"
        class="text-center py-12 bg-white rounded-lg shadow"
      >
        <svg
          class="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1"
            d="M9 12h6m-6 4h6m-6-8h6m-6 4h6m4 0l-4-4m0 0l-4 4m4-4v12"
          />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">
          No medications found
        </h3>
        <p class="mt-1 text-sm text-gray-500">
          Try adjusting your search or add a new medication.
        </p>
        <div class="mt-6">
          <button
            @click="showModal = true"
            class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <svg
              class="-ml-1 mr-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clip-rule="evenodd"
              />
            </svg>
            Add Medication
          </button>
        </div>
      </div>

      <!-- Medication Cards Grid -->
      <div
        v-else
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <MedCard
          @submit="newMedSubmitted"
          v-for="med in filteredMeds"
          :data="med"
          :key="med"
        />
      </div>
    </section>
  </div>
</template>
