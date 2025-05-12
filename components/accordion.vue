<template>
  <!-- Main FAQ Section -->
  <div class="max-w-4xl mx-auto px-4">
    <!-- FAQ Search -->
    <div class="mb-8">
      <label
        for="faq-search"
        class="block text-xl font-medium mb-2 text-gray-700"
        >Search FAQ</label
      >
      <div class="relative">
        <input
          id="faq-search"
          v-model="searchQuery"
          type="text"
          class="w-full p-4 text-lg border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          placeholder="Type your question here..."
        />
        <span
          v-if="searchQuery"
          @click="searchQuery = ''"
          class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer hover:text-gray-700"
        >
          ✕
        </span>
      </div>
    </div>

    <!-- FAQ Categories -->
    <div class="mb-8 space-x-4 flex flex-wrap gap-2">
      <button
        v-for="category in categories"
        :key="category"
        @click="
          selectedCategory = category === selectedCategory ? 'All' : category
        "
        class="px-6 py-3 text-lg rounded-full transition-colors"
        :class="
          selectedCategory === category
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
        "
      >
        {{ category }}
      </button>
    </div>

    <!-- FAQ Grid -->
    <div class="grid gap-6 md:grid-cols-2">
      <div
        v-for="(faq, index) in filteredFaqs"
        :key="index"
        class="bg-white rounded-xl shadow-sm border-2 border-gray-100 hover:border-blue-200 transition-all duration-200"
      >
        <div class="p-6">
          <h3 class="text-xl font-semibold text-gray-900 mb-3">
            {{ faq.question }}
          </h3>
          <p class="text-lg text-gray-700 leading-relaxed">
            {{ faq.answer }}
          </p>
        </div>
      </div>
    </div>

    <!-- No Results Message -->
    <div v-if="filteredFaqs.length === 0" class="text-center py-8">
      <p class="text-xl text-gray-600">
        No matching questions found. Please try a different search term.
      </p>
    </div>
  </div>

  <!-- Medication Search CTA -->
  <div class="bg-[#F7F7F5] py-12 mt-8">
    <div class="max-w-4xl mx-auto px-4 text-center">
      <h2 class="text-3xl font-semibold mb-4">
        Looking for Medication Prices?
      </h2>
      <p class="text-xl mb-6">
        Search our extensive database of affordable medications - no insurance
        needed!
      </p>
      <NuxtLink
        to="/"
        class="bg-[#F4A261] text-white px-8 py-4 rounded-lg text-lg hover:bg-[#E76F51] transition-colors"
      >
        Search Medications
      </NuxtLink>
    </div>
  </div>

  <!-- Medication Search Modal -->
  <!-- <TransitionRoot appear :show="showMedicationSearch" as="template">
        <Dialog as="div" @close="showMedicationSearch = false" class="relative z-50">
            <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
                leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-black/30" />
            </TransitionChild>

            <div class="fixed inset-0 overflow-y-auto">
                <div class="flex min-h-full items-center justify-center p-4">
                    <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-95">
                        <DialogPanel
                            class="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
                            <div class="flex justify-between items-center mb-4">
                                <DialogTitle class="text-2xl font-semibold">
                                    Search Medications
                                </DialogTitle>
                                <button @click="showMedicationSearch = false" class="text-gray-500 hover:text-gray-700">
                                    <span class="sr-only">Close</span>
                                    ✕
                                </button>
                            </div>

                            <div class="relative mb-6">
                                <input v-model="medicationQuery" type="text"
                                    class="w-full p-4 text-lg border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                    placeholder="Enter medication name..." @keyup.enter="handleMedicationSearch" />
                                <button @click="handleMedicationSearch"
                                    class="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                                    Search
                                </button>
                            </div>

                            <div v-if="medicationResults.length > 0" class="max-h-96 overflow-y-auto">
                                <div class="grid gap-4">
                                    <div v-for="med in medicationResults" :key="med.id" class="p-4 border rounded-lg">
                                        <h3 class="font-semibold">{{ med.name }}</h3>
                                        <p class="text-gray-600">{{ med.genericFor }}</p>
                                        <p class="text-lg font-bold text-blue-600">${{ med.price }}</p>
                                    </div>
                                </div>
                            </div>

                            <div v-else-if="hasSearched" class="text-center py-8">
                                <p class="text-xl text-gray-600">
                                    No medications found. Please try a different search term or call us at
                                    (847)-683-2244.
                                </p>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot> -->
</template>

<script setup>
import { ref, computed } from "vue";
// import { Dialog, DialogPanel, DialogTitle, TransitionRoot, TransitionChild } from '@headlessui/vue'

// FAQ Search and Filtering
const searchQuery = ref("");
const selectedCategory = ref("All");

const faqs = ref([
  {
    question: "How do I send my prescription?",
    answer:
      "Have your doctor send us your prescription to Hampshire Pharmacy at 262 N State St, Hampshire, IL. We will automatically apply the prices you see online.",
    category: "Prescriptions",
  },
  {
    question: "What are the pharmacy hours and what days are you open?",
    answer:
      "We are open and available to assist with your prescription needs on Monday-Fri from 10:00 am to 6:00 pm, as well as Saturday from 10:00 am to 2:00 pm.",
    category: "Hours & Location",
  },
  {
    question: "Do I need insurance?",
    answer:
      "No! We do not use insurance for our cash prescriptions. This allows us to cut out the pharmacy middleman and give you, our patient, the best prices possible.",
    category: "Insurance & Pricing",
  },
  {
    question: "Where do you get your generic medications from?",
    answer:
      "Our generic medications are sourced from vetted high quality suppliers and we fill your prescription in our community pharmacy.",
    category: "Medications",
  },
  {
    question: "Why is this better for me?",
    answer:
      "There are many cases where our pricing may benefit you. If you have a high deductible, use specialty medication not covered by insurance, or are uninsured check our prices to save on prescriptions.",
    category: "Insurance & Pricing",
  },
  {
    question: "Can I get all my prescriptions at cash prices?",
    answer:
      "We currently offer many medications at competitive prices. If you can't find what you are looking for give us a call at 847-683 - 2244 and we can help you out!",
    category: "Insurance & Pricing",
  },
  {
    question: "Can you mail my prescriptions?",
    answer: "We can currently mail prescriptions to anywhere in Illinois.",
    category: "Delivery",
  },
  {
    question: "Can I get my prescription delivered?",
    answer:
      "We currently deliver to our local areas, call us at 847-683-2244 to see if we can deliver to you.",
    category: "Delivery",
  },
  {
    question: "How do I pay for my prescription?",
    answer:
      "If you are coming to pick up your prescription you can pay at check out. For deliveries and mailing we ask to keep a credit card on file.",
    category: "Payment",
  },
  {
    question: "Why are your prices better?",
    answer:
      "We do not use insurance, this allows us to cut out the pharmacy middleman and give you, our patient, the best prices possible.",
    category: "Insurance & Pricing",
  },
]);

// Medication Search Modal
// const showMedicationSearch = ref(false)
// const medicationQuery = ref('')
// const medicationResults = ref([])
// const hasSearched = ref(false)

// const query = gql`
//   query getMeds($searchTerm: String) {
//     meds(searchTerm: $searchTerm) {
//       id
//       name
//       size
//       count
//       countUnit
//       genericFor
//       price
//     }
//   }
// `

// async function handleMedicationSearch() {
//     if (!medicationQuery.value) return

//     hasSearched.value = true
//     const variables = { searchTerm: medicationQuery.value }
//     try {
//         const { data } = await useAsyncQuery(query, variables)
//         medicationResults.value = data.value.meds
//     } catch (error) {
//         console.error('Error searching medications:', error)
//         medicationResults.value = []
//     }
// }

// Get unique categories
const categories = computed(() => {
  const uniqueCategories = [...new Set(faqs.value.map((faq) => faq.category))];
  return ["All", ...uniqueCategories];
});

// Filter FAQs based on search and category
const filteredFaqs = computed(() => {
  return faqs.value.filter((faq) => {
    const matchesSearch =
      searchQuery.value === "" ||
      faq.question.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.value.toLowerCase());

    const matchesCategory =
      selectedCategory.value === "All" ||
      faq.category === selectedCategory.value;

    return matchesSearch && matchesCategory;
  });
});
</script>
