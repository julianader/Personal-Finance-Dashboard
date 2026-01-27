<template>
  <div class="relative">
    <button
      @click="toggleDropdown"
      class="flex items-center gap-2 px-3 py-2 bg-surface-primary border border-border-primary rounded-lg hover:bg-surface-hover transition-colors"
      :class="{ 'ring-2 ring-primary-500': isOpen }"
    >
      <span class="text-lg">{{ selectedCurrency.flag }}</span>
      <span class="font-medium text-text-primary">{{ selectedCurrency.code }}</span>
      <ChevronDownIcon class="w-4 h-4 text-text-secondary transition-transform" :class="{ 'rotate-180': isOpen }" />
    </button>

    <!-- Dropdown -->
    <div
      v-if="isOpen"
      class="absolute top-full mt-2 w-48 bg-surface-primary border border-border-primary rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto"
    >
      <div class="p-2">
        <div
          v-for="currency in currencies"
          :key="currency.code"
          @click="selectCurrency(currency)"
          class="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-surface-hover cursor-pointer transition-colors"
          :class="{ 'selected-currency': currency.code === selectedCurrency.code }"
        >
          <span class="text-lg">{{ currency.flag }}</span>
          <div class="flex-1">
            <div class="font-medium text-text-primary">{{ currency.code }}</div>
            <div class="text-sm text-text-secondary">{{ currency.name }}</div>
          </div>
          <span class="text-text-primary">{{ currency.symbol }}</span>
        </div>
      </div>
    </div>

    <!-- Overlay to close dropdown -->
    <div
      v-if="isOpen"
      @click="closeDropdown"
      class="fixed inset-0 z-40"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { ChevronDownIcon } from '@heroicons/vue/24/outline'
import { useCurrencyStore } from '@/stores/currencyStore'
import type { Currency } from '@/types'

const currencyStore = useCurrencyStore()
const isOpen = ref(false)

const selectedCurrency = computed(() => currencyStore.selectedCurrency)
const currencies = computed(() => currencyStore.SUPPORTED_CURRENCIES)

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const closeDropdown = () => {
  isOpen.value = false
}

const selectCurrency = (currency: Currency) => {
  currencyStore.setSelectedCurrency(currency)
  closeDropdown()
}

// Close dropdown when clicking outside
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (!target.closest('.relative')) {
    closeDropdown()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
