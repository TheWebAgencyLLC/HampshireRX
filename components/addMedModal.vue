<script setup lang="ts">
import type { Medication } from "~/types/Medication";

interface CreateMedicationResponse {
  statusCode: number;
  med: Medication;
}

const emit = defineEmits(["submit", "modalClose"]);

//STATE
const MEDICATION_NAME = ref<string>("");
const isSaving = ref(false);
const errorMessage = ref("");

/**
 * Creates a new medication with empty options and a name, then after a successful request, it directs you to the page using the res.id
 */
const SAVE_MEDICATION = async () => {
  if (!MEDICATION_NAME.value.trim()) {
    errorMessage.value = "Medication name is required";
    return;
  }

  try {
    isSaving.value = true;
    errorMessage.value = "";

    const res = await $fetch<CreateMedicationResponse>("/api/medications/add", {
      method: "POST",
      body: {
        name: MEDICATION_NAME.value,
        options: [],
      },
    });

    if (res.statusCode === 200) {
      emit("submit");
      return navigateTo("/admin/medication/" + res.med._id);
    }
  } catch (e: any) {
    errorMessage.value = e.message || "Failed to create medication";
    console.error(e);
  } finally {
    isSaving.value = false;
  }
};

// Close modal if escape key is pressed
onMounted(() => {
  const handleEsc = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      emit("modalClose");
    }
  };
  window.addEventListener("keydown", handleEsc);

  // Focus the input field
  const inputEl = document.getElementById("medication-name-input");
  if (inputEl) {
    inputEl.focus();
  }

  onBeforeUnmount(() => {
    window.removeEventListener("keydown", handleEsc);
  });
});
</script>

<template>
  <div
    class="fixed inset-0 z-50 overflow-y-auto"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div
      class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <!-- Background overlay -->
      <div
        class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        aria-hidden="true"
        @click="$emit('modalClose')"
      ></div>

      <!-- Modal panel -->
      <div
        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
      >
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div
              class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10"
            >
              <svg
                class="h-6 w-6 text-indigo-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
              <h3
                class="text-lg leading-6 font-medium text-gray-900"
                id="modal-title"
              >
                Add New Medication
              </h3>
              <div class="mt-4">
                <form @submit.prevent="SAVE_MEDICATION">
                  <div class="mb-4">
                    <label
                      for="medication-name-input"
                      class="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Medication Name
                    </label>
                    <input
                      id="medication-name-input"
                      v-model="MEDICATION_NAME"
                      type="text"
                      placeholder="Enter medication name"
                      class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      required
                    />
                    <p v-if="errorMessage" class="mt-2 text-sm text-red-600">
                      {{ errorMessage }}
                    </p>
                  </div>
                  <p class="text-sm text-gray-500 mb-4">
                    After creating the medication, you'll be redirected to add
                    options and details.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            @click="SAVE_MEDICATION"
            :disabled="isSaving"
            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg
              v-if="isSaving"
              class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            {{ isSaving ? "Saving..." : "Save" }}
          </button>
          <button
            type="button"
            @click="$emit('modalClose')"
            class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
