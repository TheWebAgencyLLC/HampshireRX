<script setup lang="ts">
definePageMeta({
  layout: "admin",
});

//INTERFACES
type Option = {
  size: string;
  count: number;
  countUnit: string;
  price?: number;
  _id: string;
  genericFor: string;
};

type Medication = {
  name: string | null;
  options: Option[] | null;
  _id: string | null;
};

//GET PARAMS FROM ROUTE
const route = useRoute();

//STATE & REFS
const MEDICATION = ref<Medication | null>(null);
const MED_EDITED_ID = ref<string>("");
const ARE_YOU_SURE = ref<any>({
  //BOOLEAN TO WORK AS CONFIRMATION PROMPT
  ID: "",
});

//FETCH INITIAL DATA
const { data: MEDICATION_DATA } = await useFetch("/api/medications/findById", {
  server: false,
  method: "GET",
  query: {
    _id: route.params._id,
  },
  onResponse({ response }) {
    MEDICATION.value = response._data.body;
  },
});
console.log(MEDICATION_DATA.value);

//BLACK MAGIC TO ENSURE PROPER LOADING AND TYPE SAFETY.
const medicationData = computed(() => {
  if (MEDICATION.value) {
    const { name, options, _id } = MEDICATION.value;
    return { name, options, _id };
  }
  return { name: "", options: [] as Option[], _id: "" };
});

//NEW MEDICATION
const EDITED_MEDICATION = ref<Option | null>({
  size: "",
  count: 0,
  countUnit: "",
  price: 0.0,
  genericFor: "",
  _id: "",
});

//POPULATE EDITED_MEDICATION
const populateEditedMedication = (option: Option) => {
  MED_EDITED_ID.value = option._id;
  EDITED_MEDICATION.value = option;
};

//HTTP POST REQUEST TO UPDATE THE MED.

const UPDATE_MED = async () => {
  try {
    console.log(medicationData.value);
    const RES = await $fetch("/api/medications/update", {
      method: "POST",
      body: {
        name: medicationData.value.name,
        options: medicationData.value.options,
        _id: medicationData.value._id,
      },
    });
    console.log(RES);
    console.log(MEDICATION_DATA.value);
    // reloadNuxtApp();
  } catch (err: any) {
    console.log(err);
  }
};

// CREATE A NEW EMPTY OPTION

const CREATE_OPTION = () => {
  if (!MEDICATION.value) return;
  if (!MEDICATION.value.options) {
    MEDICATION.value.options = [];
  }
  const NEW_OPTION: Option = {
    size: "",
    count: 0,
    countUnit: "",
    price: 0.0,
    genericFor: "",
    _id: crypto.randomUUID(),
  };
  // Reassign the array to ensure reactivity updates are picked up
  MEDICATION.value.options = [NEW_OPTION, ...MEDICATION.value.options];
  MED_EDITED_ID.value = NEW_OPTION._id;
  EDITED_MEDICATION.value = NEW_OPTION;
};
//DELETE OPTION FROM LIST

const DELETE_OPTION = (option: Option) => {
  const index: number | undefined =
    medicationData?.value?.options?.indexOf(option);
  medicationData?.value.options?.splice(index, 1);
  UPDATE_MED();
};
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <!-- Main Container -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header Section -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900 sm:text-4xl mb-2">
          {{ medicationData.name }}
        </h1>
        <div
          class="flex items-center justify-center space-x-2 text-sm text-gray-600"
        >
          <span class="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            {{ medicationData.options.length }} variants
          </span>
          <button
            @click="CREATE_OPTION"
            class="inline-flex items-center text-indigo-600 hover:text-indigo-900 font-medium transition duration-150 ease-in-out"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Add new variant
          </button>
        </div>
      </div>

      <!-- Medication Variants Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="option in medicationData.options"
          :key="option._id"
          class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200"
        >
          <!-- Card Header with Actions -->
          <div
            class="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center"
          >
            <h2 class="font-medium text-gray-900 truncate">
              {{ option.size }}
            </h2>
            <div class="flex space-x-2">
              <button
                @click="populateEditedMedication(option)"
                class="text-indigo-600 hover:text-indigo-900"
                :class="{ 'text-indigo-900': MED_EDITED_ID === option._id }"
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
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </button>
              <button
                @click="ARE_YOU_SURE.ID = option._id"
                class="text-red-600 hover:text-red-900"
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
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          </div>

          <!-- Card Body -->
          <div class="px-4 py-4 space-y-3">
            <!-- Generic Field -->
            <div class="flex items-center justify-between">
              <span class="text-sm font-medium text-gray-700">Generic:</span>
              <span
                v-if="MED_EDITED_ID !== option._id"
                class="text-sm text-gray-900"
              >
                {{ option.genericFor || "Not specified" }}
              </span>
              <input
                v-else
                v-model="EDITED_MEDICATION.genericFor"
                class="text-sm px-2 py-1 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Generic name"
              />
            </div>

            <!-- Count Field -->
            <div class="flex items-center justify-between">
              <span class="text-sm font-medium text-gray-700">Count:</span>
              <span
                v-if="MED_EDITED_ID !== option._id"
                class="text-sm text-gray-900"
              >
                {{ option.count }} {{ option.countUnit }}
              </span>
              <div v-else class="flex items-center space-x-1">
                <input
                  v-model.number="EDITED_MEDICATION.count"
                  type="number"
                  class="text-sm w-16 px-2 py-1 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
                <input
                  v-model="EDITED_MEDICATION.countUnit"
                  class="text-sm w-20 px-2 py-1 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Unit"
                />
              </div>
            </div>

            <!-- Size Field -->
            <div class="flex items-center justify-between">
              <span class="text-sm font-medium text-gray-700">Size:</span>
              <span
                v-if="MED_EDITED_ID !== option._id"
                class="text-sm text-gray-900"
              >
                {{ option.size || "Not specified" }}
              </span>
              <input
                v-else
                v-model="EDITED_MEDICATION.size"
                class="text-sm px-2 py-1 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Size"
              />
            </div>

            <!-- Price Field -->
            <div class="flex items-center justify-between">
              <span class="text-sm font-medium text-gray-700">Price:</span>
              <span
                v-if="MED_EDITED_ID !== option._id"
                class="text-sm text-gray-900"
              >
                ${{ option.price }}
              </span>
              <div v-else class="relative">
                <div
                  class="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none"
                >
                  <span class="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  v-model.number="EDITED_MEDICATION.price"
                  type="number"
                  step="0.01"
                  class="text-sm pl-6 px-2 py-1 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>

          <!-- Card Footer with Actions -->
          <div
            v-if="MED_EDITED_ID === option._id"
            class="bg-gray-50 px-4 py-3 border-t border-gray-200"
          >
            <div class="flex justify-end space-x-2">
              <button
                @click="MED_EDITED_ID = ''"
                class="px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                @click="UPDATE_MED"
                class="px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save
              </button>
            </div>
          </div>

          <!-- Confirmation Dialog for Delete -->
          <div
            v-if="ARE_YOU_SURE.ID === option._id"
            class="px-4 py-3 bg-red-50 border-t border-red-200"
          >
            <div class="text-sm text-red-700 mb-2">
              Are you sure you want to delete this variant?
            </div>
            <div class="flex justify-end space-x-2">
              <button
                @click="ARE_YOU_SURE.ID = ''"
                class="px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Cancel
              </button>
              <button
                @click="
                  DELETE_OPTION(option);
                  ARE_YOU_SURE.ID = '';
                "
                class="px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State when no variants -->
      <div v-if="medicationData.options.length === 0" class="text-center py-12">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1"
            d="M20 12H4M12 4v16"
          />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">No variants</h3>
        <p class="mt-1 text-sm text-gray-500">
          Get started by creating a new variant.
        </p>
        <div class="mt-6">
          <button
            @click="CREATE_OPTION"
            class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="-ml-1 mr-2 h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Add variant
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#bg {
  background-color: rgb(234, 234, 234);
}
</style>
