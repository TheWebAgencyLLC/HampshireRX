<template>
  <LayoutAppHeader />

  <div class="mx-auto px-4 bg-[#F7F7F5] mt-4 rounded-bl-3xl rounded-br-3xl pb-8">
          <div class="flex flex-col items-center text-center xl:px-0 px-6 justify-center">
            <h1 class="text-5xl font-bold mb-4">
              Healthcare On <span class="text-pharmaBlue-400">Your Schedule</span>
            </h1>
            <p class="text-2xl mb-4 relative">
              Skip the waiting room. Get prescription medications through our convenient telemedicine service
            </p>
          </div>
        </div>

  <div class="w-full bg-gray-50 py-12">
    <div class="max-w-7xl mx-auto px-4">
      <div class="bg-white rounded-xl shadow-lg overflow-hidden" style="height: 1200px;">
        <iframe
          src="https://landing.xpedicare.com/#/widget/dl79"
          width="100%"
          height="100%"
          style="border: none;"
        ></iframe>
      </div>
    </div>
  </div>

  <LazyLayoutMedLandingAboveFooterCTAContainer />
  <LayoutAppFooter />
</template>

<script lang="ts" setup>

</script>

<style>

</style>