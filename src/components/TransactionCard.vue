<template>
  <div class="p-6 hover:bg-surface-hover transition-colors flex items-center justify-between">
    <div class="flex items-center gap-4 flex-1">
      <div class="w-12 h-12 bg-surface-secondary rounded-lg flex items-center justify-center">
        <component :is="getCategoryIconComponent(transaction.category)" class="w-6 h-6 text-text-primary" />
      </div>
      <div class="flex-1">
        <h4 class="font-medium text-text-primary capitalize">{{ transaction.category }}</h4>
        <p class="text-sm text-text-secondary">{{ transaction.description }}</p>
        <p class="text-xs text-text-tertiary mt-1">{{ formatDate(transaction.date) }}</p>
      </div>
    </div>
    <div class="flex items-center gap-4">
      <div>
        <p :class="['font-bold text-lg', transaction.type === 'income' ? 'text-success' : 'text-danger']">
          {{ transaction.type === 'income' ? '+' : '-' }}{{ formatCurrency(currencyStore.convertFromBase(transaction.amount), currencyStore.selectedCurrency.code) }}
        </p>
        <p v-if="transaction.originalAmount && transaction.originalCurrency" class="text-xs text-text-tertiary">
          Originally: {{ formatCurrency(transaction.originalAmount, transaction.originalCurrency) }}
        </p>
      </div>
      <button
        v-if="showDelete"
        @click="$emit('delete', transaction.id)"
        class="p-2 text-text-tertiary hover:text-danger hover:bg-danger hover:bg-opacity-10 rounded-lg transition-colors"
        title="Delete transaction"
      >
        <TrashIcon class="w-4 h-4" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatCurrency, formatDate, getCategoryIcon } from '@/utils/helpers'
import { useCurrencyStore } from '@/stores/currencyStore'
import {
  ShoppingBagIcon,
  HomeIcon,
  BoltIcon,
  FilmIcon,
  TruckIcon,
  HeartIcon,
  BookOpenIcon,
  BriefcaseIcon,
  ComputerDesktopIcon,
  ChartBarIcon,
  TagIcon,
  TrashIcon,
} from '@heroicons/vue/24/outline'
import type { Transaction } from '@/types'

interface Props {
  transaction: Transaction
  showDelete?: boolean
}

defineProps<Props>()

defineEmits<{
  delete: [id: string]
}>()

const currencyStore = useCurrencyStore()

const getCategoryIconComponent = (category: string) => {
  const iconName = getCategoryIcon(category)
  const icons: Record<string, any> = {
    ShoppingBagIcon,
    HomeIcon,
    BoltIcon,
    FilmIcon,
    TruckIcon,
    HeartIcon,
    BookOpenIcon,
    BriefcaseIcon,
    ComputerDesktopIcon,
    ChartBarIcon,
    TagIcon,
  }
  return icons[iconName] || TagIcon
}
</script>
