<template>
  <div class="bg-surface-primary border border-border-primary rounded-xl p-6 shadow-sm">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-lg font-bold text-text-primary">{{ title }}</h3>
      <router-link
          v-if="showViewAll"
          :to="viewAllRoute"
          class="text-sm text-primary-600 hover:text-primary-700 font-medium"
      >
        View All →
      </router-link>
    </div>

    <div v-if="transactions.length > 0" class="space-y-3">
      <TransactionCard
          v-for="transaction in displayedTransactions"
          :key="transaction.id"
          :transaction="transaction"
          :show-delete="showDelete"
          @delete="$emit('delete', $event)"
      />
    </div>

    <div v-else class="text-center py-8 text-text-tertiary">
      <p class="text-lg">{{ emptyMessage }}</p>
      <p v-if="emptySubMessage" class="text-sm mt-2">{{ emptySubMessage }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import TransactionCard from './TransactionCard.vue'
import type { Transaction } from '@/types'

interface Props {
  transactions: Transaction[]
  title?: string
  maxItems?: number
  showViewAll?: boolean
  viewAllRoute?: string
  showDelete?: boolean
  emptyMessage?: string
  emptySubMessage?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Transactions',
  maxItems: 10,
  showViewAll: false,
  viewAllRoute: '/history',
  showDelete: false,
  emptyMessage: 'No transactions yet',
  emptySubMessage: 'Start by adding your first transaction!',
})

defineEmits<{
  delete: [id: string]
}>()

const displayedTransactions = computed(() =>
    props.maxItems > 0 ? props.transactions.slice(0, props.maxItems) : props.transactions
)
</script>
