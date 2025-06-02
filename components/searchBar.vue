<template>
  <div class="w-full flex flex-col max-w-4xl mx-auto">
    <form
      @submit.prevent="handleSearch"
      class="flex items-center rounded-full bg-white shadow-lg overflow-hidden"
    >
      <!-- Search Input -->
      <input
        v-model="searchValue"
        type="text"
        placeholder="Look up prescription cash prices"
        class="flex-1 px-6 py-4 border-none focus:outline-none text-gray-700 placeholder-gray-400 placeholder:text-sm sm:placeholder:text-base"
      />

      <!-- Desktop Button -->
      <button
        type="submit"
        class="hidden sm:flex px-8 text-black bg-orange-500 hover:bg-orange-400 whitespace-nowrap font-semibold py-4 items-center justify-center gap-2 min-w-[180px] focus:outline-none"
      >
        Save on prescriptions
      </button>

      <div class="sm:hidden relative w-12 h-12">
        <button
          type="submit"
          class="absolute inset-0 flex items-center justify-center w-full h-full focus:outline-none"
          aria-label="Search"
        >
          <!-- Search Icon with Safe Viewport Box -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            class="w-6 h-6 text-black transform scale-90"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>
    </form>

    <!-- Suggestions Dropdown -->
    <div class="relative">
      <div
        v-if="medSuggestions.length > 0"
        class="suggestions-container p-3 mt-2 shadow-xl border border-gray-100 z-[9999] bg-white rounded-2xl absolute top-full left-0 w-full"
      >
        <div class="px-3 py-2 text-sm text-gray-500 border-b border-gray-100">
          Suggestions based on:
          <span class="font-medium text-gray-700">{{ searchValue }}</span>
          <span class="ml-1 text-gray-400"
            >({{ medSuggestions.length }}
            {{ medSuggestions.length === 1 ? "match" : "matches" }})</span
          >
        </div>

        <div
          v-for="med in medSuggestions"
          :key="med.name"
          @click="handleSearch(med.name.trim().split(' ')[0])"
          class="flex items-center gap-3 px-3 py-3 hover:bg-gray-50 cursor-pointer rounded-lg transition-colors duration-200"
        >
          <img src="/images/svg/prescription.svg" alt="" class="w-5 h-5" />
          <div>
            <div class="font-medium text-gray-900">{{ med.name }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.suggestions-container {
  max-height: 400px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #cbd5e1 transparent;
}

.suggestions-container::-webkit-scrollbar {
  width: 6px;
}

.suggestions-container::-webkit-scrollbar-track {
  background: transparent;
}

.suggestions-container::-webkit-scrollbar-thumb {
  background-color: #cbd5e1;
  border-radius: 3px;
}
</style>

<script setup>
import { ref } from "vue";

const gtm = useGTM();
const medList = ref([]);
const medSuggestions = ref([]);

const trackSearchQuery = (searchQuery) => {
  gtm.trackEvent({
    event: "search_bar_input_query",
    searchQuery: searchQuery,
  });
};

const searchValue = ref("");

watch(searchValue, async (newValue, oldValue) => {
  if (newValue.length >= 3) {
    medSuggestions.value = medList.value.filter((med) =>
      med.name.toLowerCase().includes(newValue.toLowerCase()),
    );
    // //console.log(medSuggestions.value);
  } else {
    medSuggestions.value = [];
  }
});

const temp = ref([]);

const { data } = await useFetch("/api/medications/listNames", {
  server: false,
  key: "meds",
});

watch(data, async (newValue, oldValue) => {
  //console.log(data.value.body);
  medList.value = data.value.body;
});

const handleSearch = (n) => {
  // Track the search query

  if (typeof n === "string") {
    searchValue.value = n;
  }

  trackSearchQuery(searchValue.value);

  // Handle the search logic here
  emit("search", searchValue.value);
  searchValue.value = "";
  // //console.log(searchValue.value)
};

const emit = defineEmits(["search"]);
</script>
