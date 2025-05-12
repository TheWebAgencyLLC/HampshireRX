<template>
  <AppHeader />
  <div class="relative" ref="heroRef">
    <div
      class="mx-auto px-4 bg-[#F7F7F5] mt-4 rounded-bl-3xl rounded-br-3xl pb-16"
    >
      <div
        class="flex flex-col items-center text-center xl:px-0 px-6 justify-center"
      >
        <h1 class="text-5xl font-bold mb-4">
          Affordable Medications, Trusted Service
        </h1>
        <p class="text-2xl mb-4">
          Access reliable generic drugs at fair prices,
          <span class="underline-animation">no insurance needed!</span>
        </p>
      </div>

      <div class="max-w-4xl px-12 mx-auto">
        <SearchBar @search="(n) => handleSubmit(n)" />
      </div>
    </div>
  </div>

  <div class="w-full text-center">
    <ErrorMessage v-if="errorText" :text="errorText" />
  </div>

  <div>
    <div
      id="searchResults"
      class="w-full flex flex-wrap justify-center items-start gap-4 sm:flex-col sm:items-stretch md:flex-row md:items-center"
    ></div>

    <div class="w-full">
      <div
        v-if="medData"
        :class="[
          'flex flex-wrap justify-center gap-4',
          medData.length > 3
            ? 'sm:grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 justify-center items-center place-items-center'
            : '',
        ]"
      >
        <ResultCard
          v-for="med in medData"
          :key="med.id"
          :data="med"
          class="w-full sm:w-auto sm:max-w-[300px] flex-grow-0"
        />
      </div>
    </div>
  </div>

  <AboutUsContainer />
  <SocialProofContainer />
  <AppFooter />
</template>

<script setup>
import { ref, nextTick } from "vue";

import AppHeader from "../components/layout/appHeader.vue";
import SearchBar from "../components/searchBar.vue";
import AppFooter from "~/components/layout/appFooter.vue";
import SocialProofContainer from "~/components/layout/socialProofContainer.vue";
import AboutUsContainer from "~/components/layout/aboutUsContainer.vue";

useHead({
  title: "About Hampshire Pharmacy | Making Healthcare Affordable",
  meta: [
    {
      name: "description",
      content:
        "Hampshire Pharmacy is committed to making healthcare accessible with affordable generic alternatives to brand-name medications. Our user-friendly platform helps you find cost-effective prescriptions without compromising quality.",
    },
    {
      name: "keywords",
      content:
        "affordable pharmacy, Hampshire IL pharmacy, generic medications, cost-effective prescriptions, local pharmacy, healthcare solutions, prescription savings, affordable healthcare, generic alternatives, community pharmacy, Hampshire Pharmacy mission",
    },
    // Open Graph
    {
      property: "og:title",
      content: "About Hampshire Pharmacy | Making Healthcare Affordable",
    },
    {
      property: "og:description",
      content:
        "Hampshire Pharmacy is committed to making healthcare accessible with affordable generic alternatives to brand-name medications. Our user-friendly platform helps you find cost-effective prescriptions without compromising quality.",
    },
    // Twitter
    {
      name: "twitter:title",
      content: "About Hampshire Pharmacy | Making Healthcare Affordable",
    },
    {
      name: "twitter:description",
      content:
        "Hampshire Pharmacy is committed to making healthcare accessible with affordable generic alternatives to brand-name medications. Our user-friendly platform helps you find cost-effective prescriptions without compromising quality.",
    },
  ],
});

const errorText = ref("");
const medData = ref([]); // Initialize as an empty array

async function handleSubmit(searchTerm) {
  if (searchTerm.length < 3) {
    errorText.value = "Please input at least 3 characters";
    return;
  }

  errorText.value = "";

  const res = await $fetch("/api/medications/findMed", {
    query: { searchTerm },
    method: "GET",
  });

  if (res.length === 0) {
    errorText.value =
      "Sorry, we couldn't find your medication, please call us at (847)-683-2244";
    medData.value = [];
    return;
  }
  medData.value = res;
  nextTick(() => {
    const resultsElement = document.getElementById("searchResults");
    if (resultsElement) {
      resultsElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
}
</script>
