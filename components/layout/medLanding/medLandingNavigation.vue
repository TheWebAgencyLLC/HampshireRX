<template>
    <nav class="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-pharmaBlue-400/10">
        <div class="max-w-7xl mx-auto px-4 py-3">
            <div class="flex justify-between items-center">
                <div class="flex items-center flex-1">
                    <NuxtLink to="/">
                        <img src="/images/logos/primaryWideLogo.webp" alt="Hampshire Pharmacy"
                            class="hidden md:block h-10" />
                        <img src="/images/logos/smallLogo.png" alt="Hampshire Pharmacy" class="md:hidden h-10" />
                    </NuxtLink>
                </div>

                <div class="hidden md:flex items-center justify-center gap-6 flex-1">
                    <NuxtLink v-for="link in navLinks" :key="link.text" :to="link.url"
                        class="text-gray-700 hover:text-pharmaBlue-400 transition-colors duration-200 whitespace-nowrap">
                        {{ link.text }}
                    </NuxtLink>
                </div>

                <div class="flex justify-end flex-1">
                    <NuxtLink to="/"
                        class="bg-pharmaBlue-400 text-white px-6 py-2 rounded-md hover:bg-opacity-90 transition">
                        Check Med Prices
                    </NuxtLink>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup>
const navLinks = [
    { text: 'Home', url: '/' },
    { text: 'About', url: '/about' },
    { text: 'Privacy', url: '/privacy' },
    { text: 'FAQs', url: '/faq' },
    { text: 'Prescription Transfer', url: '/transfer-prescription-start' }
]
</script>
