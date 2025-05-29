<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="translate-x-full opacity-0"
      enter-to-class="translate-x-0 opacity-100"
      leave-active-class="transition-all duration-300 ease-in"
      leave-from-class="translate-x-0 opacity-100"
      leave-to-class="translate-x-full opacity-0"
    >
      <div
        v-if="visible"
        class="fixed bottom-4 right-4 z-50 max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden"
      >
        <!-- Toast Content -->
        <div class="flex items-center p-4">
          <!-- Icon -->
          <div class="flex-shrink-0">
            <div :class="[
              'w-8 h-8 rounded-full flex items-center justify-center',
              type === 'success' ? 'bg-green-100' : 'bg-red-100'
            ]">
              <!-- Success Icon -->
              <svg 
                v-if="type === 'success'" 
                class="w-5 h-5 text-pharmaBlue-400" 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
              <!-- Error Icon -->
              <svg 
                v-else 
                class="w-5 h-5 text-red-600" 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
              </svg>
            </div>
          </div>
          
          <!-- Toast Content -->
          <div class="ml-3 flex-1">
            <p class="text-sm font-medium text-gray-900">
              {{ title }}
            </p>
            <p class="text-xs text-gray-500 mt-0.5">
              {{ message }}
            </p>
          </div>
          
          <!-- Close Button -->
          <div class="ml-4 flex-shrink-0">
            <button
              @click="close"
              class="inline-flex text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span class="sr-only">Close</span>
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
              </svg>
            </button>
          </div>
        </div>
        
        <!-- Progress Bar -->
        <div class="h-1 bg-gray-100">
          <div 
            :class="[
              'h-full transition-all duration-300 ease-linear',
              type === 'success' ? 'bg-pharmaBlue-400' : 'bg-red-500'
            ]"
            :style="{ width: `${progress}%` }"
          ></div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Props {
  title?: string
  message?: string
  type?: 'success' | 'error'
  duration?: number
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Success',
  message: 'Action completed successfully',
  type: 'success',
  duration: 4000
})

const emit = defineEmits<{
  close: []
}>()

const visible = ref(false)
const progress = ref(100)
let timer: NodeJS.Timeout | null = null
let progressTimer: NodeJS.Timeout | null = null

const show = () => {
  visible.value = true
  progress.value = 100
  
  // Start progress bar animation
  progressTimer = setInterval(() => {
    progress.value -= (100 / (props.duration / 100))
    if (progress.value <= 0) {
      progress.value = 0
      if (progressTimer) clearInterval(progressTimer)
    }
  }, 100)
  
  // Auto close after duration
  timer = setTimeout(() => {
    close()
  }, props.duration)
}

const close = () => {
  visible.value = false
  if (timer) clearTimeout(timer)
  if (progressTimer) clearInterval(progressTimer)
  emit('close')
}

onMounted(() => {
  show()
})

onUnmounted(() => {
  if (timer) clearTimeout(timer)
  if (progressTimer) clearInterval(progressTimer)
})

defineExpose({
  show,
  close
})
</script>