<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import type { Medication } from '~/types/Medication'

interface CreateMedicationResponse {
  statusCode: number
  med: Medication
}

// Emits
const emit = defineEmits<{
  (e: 'modalClose'): void
  (e: 'submit', payload: { id: string; name: string }): void
}>()

// State
const MEDICATION_NAME = ref<string>('')

// DOM refs
const inputId = 'medication-name-input'

// Key handler (defined in module scope so both hooks can access)
let handleEsc: ((e: KeyboardEvent) => void) | null = null

onMounted(async () => {
  if (!process.client) return

  handleEsc = (e: KeyboardEvent) => {
    if (e.key === 'Escape') emit('modalClose')
  }
  window.addEventListener('keydown', handleEsc)

  // Focus the input after mount
  await nextTick()
  const inputEl = document.getElementById(inputId) as HTMLInputElement | null
  inputEl?.focus()
})

onBeforeUnmount(() => {
  if (!process.client || !handleEsc) return
  window.removeEventListener('keydown', handleEsc)
  handleEsc = null
})

/**
 * Creates a new medication with empty options and a name,
 * then navigates to its admin page on success.
 */
const SAVE_MEDICATION = async () => {
  if (!MEDICATION_NAME.value.trim()) {
    // Simple guard; you can swap with a nicer UI validation if desired
    return
  }

  try {
    const res = await $fetch<CreateMedicationResponse>('/api/medications/add', {
      method: 'POST',
      body: {
        name: MEDICATION_NAME.value.trim(),
        options: [],
      },
    })

    if (res?.statusCode === 200 && res?.med?._id) {
      emit('submit', { id: res.med._id, name: MEDICATION_NAME.value.trim() })
      await navigateTo(`/admin/medication/${res.med._id}`)
      return
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e)
  }
}
</script>

<template>
  <!-- Backdrop -->
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
    role="dialog"
    aria-modal="true"
    aria-labelledby="add-medication-title"
    @click="emit('modalClose')"
  >
    <!-- Modal -->
    <div
      class="w-[min(680px,92vw)] rounded-md border border-blue-500 bg-white p-4 shadow-xl"
      @click.stop
    >
      <form @submit.prevent="SAVE_MEDICATION">
        <div class="flex flex-col gap-5">
          <span id="add-medication-title" class="text-center text-2xl font-bold">
            Add New Medication
          </span>

          <div class="flex items-center justify-between gap-2">
            <label for="medication-name-input" class="font-medium">Medication Name:</label>
            <input
              :id="inputId"
              v-model="MEDICATION_NAME"
              class="w-80 rounded border border-gray-400 bg-slate-100 p-1 shadow-md outline-none focus:ring-2 focus:ring-blue-400"
              type="text"
              name="medicationName"
              autocomplete="off"
              placeholder="e.g., Amoxicillin"
            />
          </div>
        </div>

        <div class="mt-4 flex items-center justify-end gap-2">
          <button
            type="button"
            @click="emit('modalClose')"
            class="rounded bg-red-500 px-3 py-1 text-white shadow-md hover:brightness-110 active:scale-[0.98]"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="rounded bg-blue-500 px-3 py-1 text-white shadow-md hover:brightness-110 active:scale-[0.98]"
          >
            Save
          </button>
        </div>
      </form>
      <!-- Helper text -->
      <p class="mt-2 text-xs text-gray-500">Press Esc or click the backdrop to close.</p>
    </div>
  </div>
</template>

<style scoped>
/* No component-specific styles needed; Tailwind handles layout & states. */
</style>
