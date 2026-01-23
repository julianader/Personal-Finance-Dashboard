<template>
  <button
      @click="toggleTheme"
      class="relative inline-flex h-10 w-16 items-center rounded-full bg-surface-secondary border border-border-primary transition-colors hover:bg-surface-hover focus:outline-none focus:ring-2 focus:ring-text-accent focus:ring-offset-2 focus:ring-offset-bg-primary"
      :aria-label="theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
  >
  <span
      :class="[
      'absolute top-1 h-8 w-8 transform rounded-full bg-surface-primary shadow transition-all duration-200 ease-in-out flex items-center justify-center',
      theme === 'dark' ? 'right-1' : 'left-1'
    ]"
  >
    <SunIcon v-if="theme === 'light'" class="w-4 h-4 text-yellow-500" />
    <MoonIcon v-else class="w-4 h-4 text-blue-400" />
  </span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useThemeStore } from '@/stores/themeStore'
import { SunIcon, MoonIcon } from '@heroicons/vue/24/outline'

// Placeholder logic until themeStore is created
const themeStore = useThemeStore()
const theme = computed(() => themeStore.theme)
const toggleTheme = () => {
  themeStore.toggleTheme()
}
</script>
