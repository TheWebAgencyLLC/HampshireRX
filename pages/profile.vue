<script setup lang="ts">
import { useAuthStore } from "~/stores/useAuthStore";
// Import the toast component
import ToastNotification from "~/components/ToastNotification.vue";

definePageMeta({
  middleware: "user",
});

//types

type Order = {
  _id: string;
  dateOrdered: string;
  total: number;
  status: string;
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
};

const auth = useAuthStore();

const { data } = await useFetch("/api/user/profile", {
  method: "GET",
  key: "user-profile",
  server: true,
});
const { data: orderData } = await useFetch<Order[]>("/api/orders/customer", {
  method: "GET",
  key: "orders",
  server: true,
  headers: {
    Authorization: auth.authtoken,
  },
});

//console.log(data.value);
//console.log(orderData.value);

// Toast notification state
const showToast = ref(false);
const toastTitle = ref("");
const toastMessage = ref("");
const toastType = ref<"success" | "error">("success");

// Placeholder user data
const userData = ref({
  email: data.value.email,
  firstName: data.value.firstName,
  lastName: data.value.lastName,
  DOB: data.value.DOB || "1990-01-01",
  address: {
    street: data.value.address.street,
    city: data.value.address.city,
    state: data.value.address.state,
    zip: data.value.address.zip,
  },
  phone: data.value.phone,
  role: "user",
});

const submitChanges = async () => {
  try {
    const res = await $fetch("/api/user/update", {
      method: "POST",
      body: {
        email: editedUser.value.email,
        firstName: editedUser.value.firstName,
        lastName: editedUser.value.lastName,
        DOB: editedUser.value.DOB,
        address: editedUser.value.address,
        phone: editedUser.value.phone,
      },
    });

    await refreshNuxtData("user-profile");
    isEditing.value = false;

    // Show success toast
    toastTitle.value = "Profile Updated";
    toastMessage.value = "Your profile has been updated successfully!";
    toastType.value = "success";
    showToast.value = true;
  } catch (err) {
    //console.log(err);

    // Show error toast
    toastTitle.value = "Update Failed";
    toastMessage.value = "Failed to update profile. Please try again.";
    toastType.value = "error";
    showToast.value = true;
  }
};

// Handle toast close
const onToastClose = () => {
  showToast.value = false;
};

// Editing state management
const isEditing = ref(false);
const editedUser = ref({ ...userData.value });

// Toggle edit mode
const toggleEdit = () => {
  isEditing.value = !isEditing.value;
  // Reset edited user data when canceling edit
  if (!isEditing.value) {
    editedUser.value = { ...userData.value };
  }
};

// Order history placeholder data
const orderHistory = ref([
  {
    id: "ORD-12345",
    date: "2023-05-15",
    total: 45.99,
    status: "Delivered",
    items: [
      { name: "Lisinopril 10mg", quantity: 30, price: 12.99 },
      { name: "Atorvastatin 20mg", quantity: 30, price: 15.99 },
      { name: "Metformin 500mg", quantity: 60, price: 17.01 },
    ],
  },
  {
    id: "ORD-12346",
    date: "2023-06-22",
    total: 35.5,
    status: "Processing",
    items: [
      { name: "Omeprazole 20mg", quantity: 30, price: 18.5 },
      { name: "Amlodipine 5mg", quantity: 30, price: 17.0 },
    ],
  },
]);

// Format currency
const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

// Format date
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Toggle order details
const expandedOrder = ref(null);
const toggleOrderDetails = (orderId) => {
  expandedOrder.value = expandedOrder.value === orderId ? null : orderId;
};
</script>

<template>
  <div class="flex flex-col min-h-screen bg-[#F7F7F5]">
    <LayoutAppHeader />
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Page Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
        <p class="text-gray-600">
          Manage your personal information and review your order history
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Profile Information Card -->
        <div class="lg:col-span-1">
          <div class="bg-white shadow rounded-lg overflow-hidden">
            <div
              class="bg-gradient-to-r from-pharmaBlue-400 to-indigo-600 px-6 py-4"
            >
              <div class="flex items-center justify-between">
                <h2 class="text-xl font-semibold text-white">
                  Personal Information
                </h2>
                <button
                  @click="toggleEdit"
                  class="flex items-center justify-center w-8 h-8 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div class="p-6">
              <div v-if="!isEditing" class="space-y-6">
                <div class="flex justify-center mb-6">
                  <div
                    class="w-24 h-24 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600"
                  >
                    <span class="text-2xl font-semibold">
                      {{ data?.firstName.charAt(0)
                      }}{{ data?.lastName.charAt(0) }}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 class="text-sm font-medium text-gray-500">Full Name</h3>
                  <p class="mt-1 text-sm text-gray-900">
                    {{ data.firstName }} {{ data.lastName }}
                  </p>
                </div>

                <div>
                  <h3 class="text-sm font-medium text-gray-500">
                    Email Address
                  </h3>
                  <p class="mt-1 text-sm text-gray-900">{{ data.email }}</p>
                </div>

                <div>
                  <h3 class="text-sm font-medium text-gray-500">
                    Phone Number
                  </h3>
                  <p class="mt-1 text-sm text-gray-900">{{ data.phone }}</p>
                </div>

                <div>
                  <h3 class="text-sm font-medium text-gray-500">
                    Date of Birth
                  </h3>
                  <p class="mt-1 text-sm text-gray-900">
                    <NuxtTime :datetime="formatDate(userData.DOB)"></NuxtTime>
                  </p>
                </div>

                <div>
                  <h3 class="text-sm font-medium text-gray-500">Address</h3>
                  <p class="mt-1 text-sm text-gray-900">
                    {{ data.address.street }}<br />
                    {{ data.address.city }}, {{ data.address.state }}
                    {{ data.address.zip }}
                  </p>
                </div>
              </div>

              <div v-else class="space-y-4">
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700">
                      First Name
                    </label>
                    <input
                      type="text"
                      v-model="editedUser.firstName"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700">
                      Last Name
                    </label>
                    <input
                      type="text"
                      v-model="editedUser.lastName"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    v-model="editedUser.email"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    v-model="editedUser.phone"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    v-model="editedUser.DOB"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700">
                    Street Address
                  </label>
                  <input
                    type="text"
                    v-model="editedUser.address.street"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div class="grid grid-cols-3 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700">
                      City
                    </label>
                    <input
                      type="text"
                      v-model="editedUser.address.city"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700">
                      State
                    </label>
                    <input
                      type="text"
                      v-model="editedUser.address.state"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      v-model="editedUser.address.zip"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div class="pt-4 flex justify-end gap-3">
                  <button
                    @click="toggleEdit"
                    class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    @click="submitChanges"
                    class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors font-medium"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Order History Card -->
        <div class="lg:col-span-2">
          <div class="bg-white shadow rounded-lg overflow-hidden">
            <div
              class="bg-gradient-to-r from-indigo-600 to-pharmaBlue-400 px-6 py-4"
            >
              <h2 class="text-xl font-semibold text-white">Order History</h2>
            </div>

            <div class="p-6">
              <!-- No Orders View -->
              <div
                v-if="!orderData || orderData.length === 0"
                class="text-center py-12"
              >
                <div class="flex justify-center mb-6">
                  <img
                    src="/images/noOrdersView.png"
                    alt="No orders illustration"
                    class="max-w-xs w-full h-auto border border-pharmaBlue-400"
                  />
                </div>
                <p class="text-gray-500 mb-6">
                  You haven't placed any orders yet. Start browsing our products
                  to place your first order!
                </p>
                <NuxtLink
                  to="/products"
                  class="inline-flex items-center px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition-colors"
                >
                  Browse Products
                </NuxtLink>
              </div>

              <!-- Orders List -->
              <div v-else class="space-y-6">
                <div
                  v-for="order in orderData"
                  :key="order._id"
                  class="bg-gray-50 rounded-lg overflow-hidden"
                >
                  <div
                    class="px-6 py-4 flex flex-wrap items-center justify-between cursor-pointer"
                    @click="toggleOrderDetails(order._id)"
                  >
                    <div
                      class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-8 mb-2 sm:mb-0"
                    >
                      <div>
                        <span class="text-sm font-medium text-gray-500"
                          >Order ID:</span
                        >
                        <span class="ml-2 text-sm text-gray-900">{{
                          order._id
                        }}</span>
                      </div>
                      <div>
                        <span class="text-sm font-medium text-gray-500"
                          >Date:</span
                        >
                        <span class="ml-2 text-sm text-gray-900">{{
                          formatDate(order.dateOrdered)
                        }}</span>
                      </div>
                    </div>

                    <div
                      class="flex items-center justify-between w-full sm:w-auto"
                    >
                      <div class="flex items-center">
                        <span class="text-sm font-medium text-gray-500"
                          >Total:</span
                        >
                        <span class="ml-2 text-sm text-gray-900">{{
                          formatCurrency(order.total)
                        }}</span>
                      </div>

                      <div class="flex items-center ml-4">
                        <span
                          :class="[
                            'inline-flex rounded-full px-2 text-xs font-semibold',
                            order.status === 'Delivered'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-blue-100 text-blue-800',
                          ]"
                        >
                          {{ order.status }}
                        </span>
                      </div>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        :class="[
                          'h-5 w-5 text-gray-400 ml-4 transform transition-transform',
                          expandedOrder === order._id ? 'rotate-180' : '',
                        ]"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>

                  <div
                    v-if="expandedOrder === order._id"
                    class="px-6 py-4 border-t border-gray-200"
                  >
                    <h4 class="text-sm font-medium text-gray-500 mb-3">
                      Order Items
                    </h4>
                    <div class="overflow-x-auto">
                      <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-100">
                          <tr>
                            <th
                              scope="col"
                              class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Item
                            </th>
                            <th
                              scope="col"
                              class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Quantity
                            </th>
                            <th
                              scope="col"
                              class="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Price
                            </th>
                          </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                          <tr v-for="(item, index) in order.items" :key="index">
                            <td
                              class="px-4 py-2 whitespace-nowrap text-sm text-gray-900"
                            >
                              {{ item.medication.name }}
                            </td>
                            <td
                              class="px-4 py-2 whitespace-nowrap text-sm text-gray-900"
                            >
                              {{ item.quantity }}
                            </td>
                            <td
                              class="px-4 py-2 whitespace-nowrap text-sm text-gray-900 text-right"
                            >
                              {{
                                formatCurrency(
                                  item.medication.price * item.quantity,
                                )
                              }}
                            </td>
                          </tr>
                        </tbody>
                        <tfoot>
                          <tr>
                            <td
                              colspan="2"
                              class="px-4 py-2 text-sm font-medium text-gray-900 text-right"
                            >
                              Total:
                            </td>
                            <td
                              class="px-4 py-2 text-sm font-medium text-gray-900 text-right"
                            >
                              {{ formatCurrency(order.total) }}
                            </td>
                          </tr>
                        </tfoot>
                      </table>

                      <h4 class="mt-4 text-pharmaBlue-400">
                        Any questions for us? Please contact us at (847)
                        683-2244
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Toast Notification -->
    <ToastNotification
      v-if="showToast"
      :title="toastTitle"
      :message="toastMessage"
      :type="toastType"
      @close="onToastClose"
    />

    <LayoutAppFooter />
  </div>
</template>
