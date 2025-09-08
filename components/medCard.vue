<script setup lang="js">
const emit = defineEmits(["submit"]);
const { data } = defineProps(["data"]);

const confirmDeletion = ref(false);
const isBeingEdited = ref(false);

// Create a copy of data for editing
const newMedData = ref({
  id: data._id,
  name: data.name,
});

// Toggle edit mode
const toggleEdit = () => {
  if (!isBeingEdited.value) {
    // Reset form data when entering edit mode
    newMedData.value = {
      id: data._id,
      name: data.name,
    };
  }
  isBeingEdited.value = !isBeingEdited.value;
};

// Cancel editing
const cancelEdit = () => {
  isBeingEdited.value = false;
  confirmDeletion.value = false;
};

// Save Changes Function
const saveChanges = async () => {
  try {
    const response = await $fetch("/api/meds/update", {
      method: "POST",
      body: {
        id: newMedData.value.id,
        name: newMedData.value.name,
      },
    });
    if (response.statusCode === 200) {
      isBeingEdited.value = false; // Exit edit mode after saving
      emit("submit");
    }
  } catch (error) {
    console.error("Error updating med:", error);
  }
};

const deleteMed = async () => {
  try {
    const res = await $fetch("/api/meds/delete", {
      method: "POST",
      body: {
        id: data._id,
      },
    });
    if (res.statusCode === 200) {
      emit("submit");
    }
  } catch (e) {
    console.error("Error deleting medication:", e);
  }
};
</script>

<template>
  <div
    class="border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 bg-white overflow-hidden flex flex-col w-full max-w-[25rem]"
  >
    <!-- Header -->
    <div
      v-if="!isBeingEdited"
      @click="navigateTo(`/admin/medication/${data._id}`)"
      class="bg-indigo-600 hover:bg-indigo-700 text-white p-4 text-lg font-medium cursor-pointer transition-colors flex justify-between items-center"
    >
      <span>{{ data.name }}</span>
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
          d="M9 5l7 7-7 7"
        />
      </svg>
    </div>
    <div v-else class="bg-indigo-600 p-4">
      <input
        class="border border-gray-300 rounded px-3 py-2 w-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        v-model="newMedData.name"
        type="text"
        placeholder="Medication name"
      />
    </div>

    <!-- Actions -->
    <div class="p-4 flex-grow flex flex-col justify-between">
      <div class="text-sm text-gray-500 mb-4">
        Click to view or edit medication options
      </div>

      <div class="flex justify-end space-x-2 mt-4">
        <template v-if="!isBeingEdited">
          <button
            @click.stop="toggleEdit"
            class="px-3 py-1 bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200 transition-colors text-sm font-medium"
          >
            Edit
          </button>
          <button
            v-if="!confirmDeletion"
            @click.stop="confirmDeletion = true"
            class="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors text-sm font-medium"
          >
            Delete
          </button>
          <div v-else class="flex space-x-2">
            <button
              @click.stop="deleteMed"
              class="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm font-medium"
            >
              Confirm
            </button>
            <button
              @click.stop="confirmDeletion = false"
              class="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors text-sm font-medium"
            >
              Cancel
            </button>
          </div>
        </template>
        <template v-else>
          <button
            @click.stop="saveChanges"
            class="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors text-sm font-medium"
          >
            Save
          </button>
          <button
            @click.stop="cancelEdit"
            class="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors text-sm font-medium"
          >
            Cancel
          </button>
        </template>
      </div>
    </div>
  </div>
</template>
