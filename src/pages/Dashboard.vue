<template>
  <div class="space-y-8">
    <!-- Welcome Section -->
    <div class="mb-8 flex items-center justify-between">
      <div>
        <h2 class="text-3xl font-bold text-text-primary mb-2">Welcome back!</h2>
        <p class="text-text-secondary">Here's your financial overview for this month.</p>
      </div>
      <CurrencySelector />
    </div>

    <!-- Stats Cards -->
    <SummaryStats :stats="summaryStats" />

    <!-- Charts Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Expense Breakdown -->
      <div class="bg-surface-primary border border-border-primary rounded-xl p-6 shadow-sm">
        <h3 class="text-lg font-bold text-text-primary mb-4">Expense Breakdown</h3>
        <div v-if="categoryBreakdown.length > 0" class="space-y-4">
          <div v-for="category in categoryBreakdown" :key="category.category" class="space-y-2">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <component :is="getCategoryIconComponent(category.category)" class="w-6 h-6 text-text-primary" />
                <div>
                  <p class="font-medium text-text-primary capitalize">{{ category.category }}</p>
                  <p class="text-xs text-text-tertiary">{{ formatCurrency(category.amount) }}</p>
                </div>
              </div>
              <span class="text-sm font-medium text-text-secondary">{{ category.percentage.toFixed(1) }}%</span>
            </div>
            <div class="h-2 bg-surface-hover rounded-full overflow-hidden">
              <div class="h-full rounded-full" :style="{ width: category.percentage + '%', backgroundColor: category.color }"></div>
            </div>
          </div>
        </div>
        <div v-else class="text-center py-8 text-text-tertiary">
          <p>No expenses recorded yet</p>
        </div>
      </div>

      <!-- Savings Rate -->
      <div class="bg-surface-primary border border-border-primary rounded-xl p-6 shadow-sm">
        <h3 class="text-lg font-bold text-text-primary mb-4">Savings Rate</h3>
        <div class="flex flex-col items-center justify-center py-8">
          <div class="relative w-32 h-32 flex items-center justify-center">
            <svg class="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="var(--border-secondary)" stroke-width="8" />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                :stroke="stats.savingsRate > 0 ? '#10b981' : '#ef4444'"
                stroke-width="8"
                stroke-dasharray="282.7"
                :stroke-dashoffset="282.7 - (282.7 * Math.min(stats.savingsRate, 100)) / 100"
                stroke-linecap="round"
              />
            </svg>
            <div class="absolute text-center">
              <p class="text-3xl font-bold text-text-primary">{{ stats.savingsRate.toFixed(1) }}%</p>
              <p class="text-xs text-text-tertiary">saved</p>
            </div>
          </div>
          <p class="mt-6 text-center text-sm text-text-secondary">
            <span v-if="stats.savingsRate > 0" class="text-success font-medium">Great job! You're saving {{ stats.savingsRate.toFixed(1) }}% of your income.</span>
            <span v-else-if="stats.savingsRate === 0" class="text-text-primary font-medium">You didn't save any money this period.</span>
            <span v-else class="text-danger font-medium">You have debts - you're spending {{ Math.abs(stats.savingsRate).toFixed(1) }}% more than your income.</span>
          </p>
        </div>
      </div>
    </div>

    <!-- Recent Transactions -->
    <TransactionList
      :transactions="recentTransactions"
      title="Recent Transactions"
      :max-items="5"
      :show-view-all="true"
      view-all-route="/history"
      empty-message="No transactions yet"
      empty-sub-message="Start by adding your first transaction!"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useTransactionStore } from '@/stores/transactionStore'
import { formatCurrency, getCategoryIcon } from '@/utils/helpers'
import SummaryStats from '@/components/SummaryStats.vue'
import TransactionList from '@/components/TransactionList.vue'
import CurrencySelector from '@/components/CurrencySelector.vue'
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
} from '@heroicons/vue/24/outline'
import type { StatItem } from '@/components/SummaryStats.vue'

const store = useTransactionStore()

onMounted(async () => {
  store.fetchTransactions()
})

const stats = computed(() => store.dashboardStats)
const categoryBreakdown = computed(() => store.expenseCategoryBreakdown)
const recentTransactions = computed(() => store.recentTransactions)

const expensePercentage = computed(() => {
  if (stats.value.totalIncome === 0) return 0
  return Math.min((stats.value.totalExpenses / stats.value.totalIncome) * 100, 100)
})

const summaryStats = computed<StatItem[]>(() => [
  {
    label: 'Total Balance',
    value: formatCurrency(stats.value.balance),
    variant: 'gradient',
    subtitle: `${stats.value.transactionCount} transactions`,
  },
  {
    label: 'Total Income',
    value: formatCurrency(stats.value.totalIncome),
    variant: 'default',
    progress: 100,
    progressColor: 'bg-success',
  },
  {
    label: 'Total Expenses',
    value: formatCurrency(stats.value.totalExpenses),
    variant: 'default',
    progress: expensePercentage.value,
    progressColor: 'bg-danger',
  },
])

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
