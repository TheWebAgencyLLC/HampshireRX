<script setup lang="ts">
import type { Medication } from '~/types/Medication'

interface CreateMedicationResponse {
  statusCode: number
  med: Medication
}

const emit = defineEmits<{
  (e: 'submit'): void
  (e: 'modalClose'): void
}>()

// STATE
const MEDICATION_NAME = ref<string>('')
const isSaving = ref(false)
const errorMessage = ref('')

// DOM ids / handlers
const inputId = 'medication-name-input'
let handleEsc: ((e: KeyboardEvent) => void) | null = null

/**
 * Creates a new medication with empty options and a name,
 * then after a successful request, it navigates to the new page.
 */
const SAVE_MEDICATION = async () => {
  if (!MEDICATION_NAME.value.trim()) {
    errorMessage.value = 'Medication name is required'
    return
  }

  try {
    isSaving.value = true
    errorMessage.value = ''

    const res = await $fetch<CreateMedicationResponse>('/api/medications/add', {
      method: 'POST',
      body: {
        name: MEDICATION_NAME.value,
        options: [],
      },
    })

    if (res.statusCode === 200) {
      emit('submit')
      return navigateTo('/admin/medication/' + res.med._id)
    }
  } catch (e: any) {
    errorMessage.value = e?.message || 'Failed to create medication'
    console.error(e)
  } finally {
    isSaving.value = false
  }
}

// Top-level lifecycle (no nesting) to avoid Nuxt/MagicString transform error
onMounted(async () => {
  if (!process.client) return

  handleEsc = (e: KeyboardEvent) => {
    if (e.key === 'Escape') emit('modalClose')
  }
  window.addEventListener('keydown', handleEsc)

  // Focus the input field
  await nextTick()
  const inputEl = document.getElementById(inputId) as HTMLInputElement | null
  inputEl?.focus()
})

onBeforeUnmount(() => {
  if (!process.client || !handleEsc) return
  window.removeEventListener('keydown', handleEsc)
  handleEsc = null
})
</script>

<template>
  <div
    class="fixed inset-0 z-50 overflow-y-auto"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div class="flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
      <!-- Background overlay -->
      <div
        class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        aria-hidden="true"
        @click="$emit('modalClose')"
      ></div>

      <!-- Modal panel -->
      <div
        class="inline-block w-full transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle"
      >
        <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div
              class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10"
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

            <div class="mt-3 w-full text-center sm:ml-4 sm:mt-0 sm:text-left">
              <h3 class="text-lg font-medium leading-6 text-gray-900" id="modal-title">
                Add New Medication
              </h3>

              <div class="mt-4">
                <form @submit.prevent="SAVE_MEDICATION">
                  <div class="mb-4">
                    <label for="medication-name-input" class="mb-1 block text-sm font-medium text-gray-700">
                      Medication Name
                    </label>
                    <input
                      :id="inputId"
                      v-model="MEDICATION_NAME"
                      type="text"
                      placeholder="Enter medication name"
                      class="block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      required
                    />
                    <p v-if="errorMessage" class="mt-2 text-sm text-red-600">
                      {{ errorMessage }}
                    </p>
                  </div>

                  <p class="mb-4 text-sm text-gray-500">
                    After creating the medication, you'll be redirected to add options and details.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <button
            type="button"
            @click="SAVE_MEDICATION"
            :disabled="isSaving"
            class="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:ml-3 sm:w-auto sm:text-sm"
          >
            <svg
              v-if="isSaving"
              class="-ml-1 mr-2 h-4 w-4 animate-spin text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            {{ isSaving ? 'Saving...' : 'Save' }}
          </button>

          <button
            type="button"
            @click="$emit('modalClose')"
            class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
