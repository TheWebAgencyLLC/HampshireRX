<template>
  <footer
    class="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
  >
    <div class="max-w-7xl mx-auto pt-12 pb-8 px-4 sm:px-6 lg:px-8">
      <!-- Main Footer Content -->
      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-8">
        <!-- Brand Section -->
        <div class="space-y-4">
          <div class="flex items-center space-x-3">
            <img
              src="/public/images/logos/smallLogoWhite.png"
              alt="Hampshire Pharmacy small white logo"
              class="h-8"
            />
            <h3 class="text-lg font-bold text-gray-900 dark:text-white">
              Hampshire Pharmacy
            </h3>
          </div>
          <p class="text-gray-600 dark:text-gray-300">
            Your trusted community pharmacy since 2014
          </p>
          <div v-html="legitScriptTag"></div>
        </div>

        <!-- Quick Links Section -->
        <div class="space-y-4">
          <div class="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5 text-orange-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            <h3 class="font-semibold text-gray-900 dark:text-white">
              Quick Links
            </h3>
          </div>
          <ul class="space-y-2">
            <li v-for="link in footerLinks" :key="link.text">
              <NuxtLink
                :to="link.url"
                class="text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
              >
                {{ link.text }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Contact Section -->
        <div class="space-y-4">
          <div class="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5 text-orange-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <h3 class="font-semibold text-gray-900 dark:text-white">Contact</h3>
          </div>
          <ul class="space-y-2">
            <li>
              <a
                href="tel:+18476832244"
                class="text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
              >
                (847) 683-2244
              </a>
            </li>
            <li>
              <a
                href="mailto:hampshirepharmacy@gmail.com"
                class="text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
              >
                hampshirepharmacy@gmail.com
              </a>
            </li>
            <li>
              <a
                href="https://maps.google.com/?q=262+N+State+St,+Hampshire,+IL"
                target="_blank"
                rel="noopener noreferrer"
                class="text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
              >
                262 N State St, Hampshire, IL
              </a>
            </li>
          </ul>
        </div>

        <!-- Hours Section -->
        <div class="space-y-4">
          <div class="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5 text-orange-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 class="font-semibold text-gray-900 dark:text-white">Hours</h3>
          </div>
          <ul class="space-y-2 text-gray-600 dark:text-gray-300">
            <li class="flex justify-between">
              <span>Mon-Fri</span>
              <span>10am - 6pm</span>
            </li>
            <li class="flex justify-between">
              <span>Saturday</span>
              <span>10am - 2pm</span>
            </li>
            <li class="flex justify-between">
              <span>Sunday</span>
              <span>Closed</span>
            </li>
          </ul>
        </div>

        <!-- Constant Contact / Stay Connected Section -->
        <div class="space-y-4">
          <div class="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5 text-orange-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <h3 class="font-semibold text-gray-900 dark:text-white">
              Stay Connected
            </h3>
          </div>
          <!-- Wrap the popup form instance -->
          <div class="constant-contact-wrapper">
            <ConstantContactForm />
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="pt-8 mt-8 border-t border-gray-200 dark:border-gray-700">
        <p class="text-center text-gray-500 dark:text-gray-400 text-sm">
          © {{ new Date().getFullYear() }} Hampshire Pharmacy. All rights
          reserved.
        </p>
        <div class="text-sm text-gray-500 dark:text-gray-400 text-center">
          Built by the
          <NuxtLink
            class="text-orange-600 dark:text-orange-400 hover:underline"
            to="https://thewebagency.app"
          >
            TheWebAgency
          </NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
/* Apply CTCT styles only within the constant-contact-wrapper using deep selectors */
.constant-contact-wrapper ::v-deep .ctct-form-container,
.constant-contact-wrapper ::v-deep .ctct-form-defaults,
.constant-contact-wrapper ::v-deep .ctct-form-custom,
.constant-contact-wrapper ::v-deep .ctct-form-success,
.constant-contact-wrapper ::v-deep .ctct-form-error {
  max-width: 100% !important;
  margin: 0 !important;
  padding: 0 !important;
  background: transparent !important;
}

.constant-contact-wrapper ::v-deep .ctct-form-header {
  font-size: 1rem !important;
  margin-bottom: 0.5rem !important;
  color: #fff !important;
}

.constant-contact-wrapper ::v-deep .ctct-form-text {
  font-size: 0.75rem !important;
  margin-bottom: 0.5rem !important;
  line-height: 1.2 !important;
  color: #fff !important;
}

.constant-contact-wrapper ::v-deep .ctct-form-label {
  color: #fff !important;
}

.constant-contact-wrapper ::v-deep .ctct-form-required {
  color: #fff !important;
}

.constant-contact-wrapper ::v-deep .ctct-form-field {
  margin-bottom: 0.5rem !important;
}

.constant-contact-wrapper ::v-deep .ctct-form-element {
  padding: 0.25rem 0.5rem !important;
  height: 2rem !important;
  background: #fff !important;
  border: 1px solid #e5e7eb !important;
  color: #1f2937 !important;
  border-radius: 0.375rem !important;
}

.constant-contact-wrapper ::v-deep .ctct-form-button {
  padding: 0.25rem !important;
  height: 2rem !important;
  background: #fe9601 !important;
  color: #fff !important;
  border-radius: 0.375rem !important;
}

.constant-contact-wrapper ::v-deep .ctct-gdpr-text {
  font-size: 0.625rem !important;
  line-height: 1.2 !important;
  display: none !important;
  margin-top: 0.5rem !important;
}

.constant-contact-wrapper ::v-deep .ctct-form-footer {
  display: none !important;
}

.constant-contact-wrapper ::v-deep #gdpr_text {
  background: transparent !important;
}

.constant-contact-wrapper ::v-deep .ctct-inline-form .ctct-form-defaults {
  background: transparent !important;
}

.constant-contact-wrapper ::v-deep .ctct-form-element:focus {
  outline: none !important;
  border-color: #fe9601 !important;
  box-shadow: 0 0 0 2px rgba(254, 150, 1, 0.2) !important;
}

.constant-contact-wrapper ::v-deep .ctct-form-element::placeholder {
  color: #6b7280 !important;
}
</style>

<script setup>
import ConstantContactForm from "~/components/constantContactForm.vue";

const footerLinks = [
  { text: "Home", url: "/" },
  { text: "About Us", url: "/about" },
  { text: "Telehealth", url: "/telehealth" },
  { text: "Mens Health", url: "/mens-health" },
  { text: "Privacy Policy", url: "/privacy" },
  { text: "FAQs", url: "/faq" },
];

const legitScriptTag =
  '<script src="https://static.legitscript.com/seals/316843.js"><\/script>';
</script>
