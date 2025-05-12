<script setup lang="ts">
// Reactive date and time
const currentDateTime = ref(new Date());

// Update time every second
const updateClock = () => {
  currentDateTime.value = new Date();
};

// Setup interval for clock and clean up on component unmount
let clockInterval: NodeJS.Timeout;
onMounted(() => {
  updateClock();
  clockInterval = setInterval(updateClock, 1000);
});
onUnmounted(() => {
  clearInterval(clockInterval);
});

// Format date and time
const formattedDate = computed(() => {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(currentDateTime.value);
});

const formattedTime = computed(() => {
  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }).format(currentDateTime.value);
});

// Logout function (to be implemented later)
const handleLogout = () => {
  // Placeholder for logout logic
  console.log("Logout clicked");
};
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <!-- Admin Header/Navbar -->
    <header class="bg-white shadow-sm sticky top-0 z-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo/Brand -->
          <div class="flex items-center">
            <NuxtLink
              to="/admin"
              class="text-2xl font-bold text-indigo-600 hover:text-indigo-500 transition-colors"
            >
              Admin Dashboard
            </NuxtLink>
          </div>

          <!-- Center section with date and time -->
          <div class="hidden md:flex flex-col items-center">
            <div class="text-sm font-medium text-gray-600">
              {{ formattedDate }}
            </div>
            <div class="text-lg font-semibold text-gray-800">
              {{ formattedTime }}
            </div>
          </div>

          <!-- Right section with user menu -->
          <div class="flex items-center space-x-4">
            <!-- Mobile date/time (visible on small screens) -->
            <div class="md:hidden flex flex-col items-end">
              <div class="text-sm font-medium text-gray-600">
                {{ formattedDate }}
              </div>
              <div class="text-base font-semibold text-gray-800">
                {{ formattedTime }}
              </div>
            </div>

            <!-- Logout button -->
            <button
              @click="handleLogout"
              class="ml-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
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
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content Area -->
    <main class="flex-grow">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-white border-t border-gray-200 py-4">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center text-sm text-gray-500">
          © {{ new Date().getFullYear() }} Admin Dashboard for Hampshire
          Pharmacy
        </div>
      </div>
    </footer>
  </div>
</template>
