<template>
  <div class="space-y-8">
    <!-- Welcome Section -->
    <div class="mb-8 flex items-center justify-between">
      <div>
        <h2 class="text-3xl font-bold text-text-primary mb-2">Welcome back!</h2>
        <p class="text-text-secondary">Here's your financial overview for this month.</p>
      </div>
      <!-- CurrencySelector will be added later -->
    </div>

    <!-- Stats Cards -->
    <SummaryStats :stats="summaryStats" />

    <!-- Charts Section (Placeholder) -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="bg-surface-primary border border-border-primary rounded-xl p-6 shadow-sm">
        <h3 class="text-lg font-bold text-text-primary mb-4">Expense Breakdown</h3>
        <div class="text-center py-8 text-text-tertiary">
          <p>Chart coming soon...</p>
        </div>
      </div>
      <div class="bg-surface-primary border border-border-primary rounded-xl p-6 shadow-sm">
        <h3 class="text-lg font-bold text-text-primary mb-4">Savings Rate</h3>
        <div class="text-center py-8 text-text-tertiary">
          <p>Visualization coming soon...</p>
        </div>
      </div>
    </div>

    <!-- Recent Transactions (Placeholder) -->
    <div class="bg-surface-primary border border-border-primary rounded-xl p-6 shadow-sm">
      <h3 class="text-lg font-bold text-text-primary mb-4">Recent Transactions</h3>
      <div class="text-center py-8 text-text-tertiary">
        <p>Transaction list component coming soon...</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useTransactionStore } from '@/stores/transactionStore'
import { formatCurrency } from '@/utils/helpers'
import SummaryStats from '@/components/SummaryStats.vue'
import type { StatItem } from '@/components/SummaryStats.vue'

const store = useTransactionStore()

onMounted(() => {
  store.fetchTransactions()
  // currencyStore.initialize() will be added later
})

const stats = computed(() => store.dashboardStats)

const expensePercentage = computed(() => {
  if (stats.value.totalIncome === 0) return 0
  return Math.min((stats.value.totalExpenses / stats.value.totalIncome) * 100, 100)
})

const summaryStats = computed<StatItem[]>(() => [
  {
    label: 'Total Balance',
    value: formatCurrency(stats.value.balance, 'USD'), // Using USD as base currency for now
    variant: 'gradient',
    subtitle: `${stats.value.transactionCount} transactions`,
  },
  {
    label: 'Total Income',
    value: formatCurrency(stats.value.totalIncome, 'USD'),
    variant: 'default',
    progress: 100,
    progressColor: 'bg-success',
  },
  {
    label: 'Total Expenses',
    value: formatCurrency(stats.value.totalExpenses, 'USD'),
    variant: 'default',
    progress: expensePercentage.value,
    progressColor: 'bg-danger',
  },
])
</script>
