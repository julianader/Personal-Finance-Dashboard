<template>
  <div class="space-y-8">
    <div class="mb-8">
      <h2 class="text-3xl font-bold text-text-primary mb-2">Transaction History</h2>
      <p class="text-text-secondary">View and manage all your transactions.</p>
    </div>

    <!-- Filters -->
    <div class="bg-surface-primary border border-border-primary rounded-xl p-6 shadow-sm">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <!-- Type Filter -->
        <div>
          <label class="block text-sm font-medium text-text-primary mb-2">Type</label>
          <select
            v-model="filters.type"
            class="w-full px-4 py-2"
          >
            <option value="">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        <!-- Category Filter -->
        <div>
          <label class="block text-sm font-medium text-text-primary mb-2">Category</label>
          <CategorySelect
            v-model="filters.category"
            type="expense"
          />
        </div>

        <!-- Sort -->
        <div>
          <label class="block text-sm font-medium text-text-primary mb-2">Sort By</label>
          <select
            v-model="filters.sort"
            class="w-full px-4 py-2"
          >
            <option value="date-desc">Newest First</option>
            <option value="date-asc">Oldest First</option>
            <option value="amount-desc">Highest Amount</option>
            <option value="amount-asc">Lowest Amount</option>
          </select>
        </div>

        <!-- Reset Button -->
        <div class="flex items-end">
          <button
            @click="resetFilters"
            class="w-full px-4 py-2 bg-surface-secondary hover:bg-surface-hover text-text-primary font-medium rounded-lg transition-colors border border-border-primary"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </div>

    <!-- Transactions List -->
    <div class="bg-surface-primary border border-border-primary rounded-xl shadow-sm overflow-hidden">
      <div v-if="filteredTransactions.length > 0" class="divide-y divide-border-primary">
        <TransactionCard
          v-for="transaction in filteredTransactions"
          :key="transaction.id"
          :transaction="transaction"
          :show-delete="true"
          @delete="deleteTransaction"
        />
      </div>
      <div v-else class="p-12 text-center text-text-tertiary">
        <p class="text-lg">No transactions found</p>
        <p class="text-sm mt-2">Try adjusting your filters or add a new transaction</p>
      </div>
    </div>

        <!-- Actions -->
        <div v-if="transactions.length > 0" class="bg-surface-primary border border-border-primary rounded-xl p-4 shadow-sm">
      <div class="flex items-center justify-between">
        <div>
          <h3 class="text-lg font-semibold text-text-primary mb-1">Danger Zone</h3>
          <p class="text-sm text-text-secondary">Actions that cannot be undone</p>
        </div>
        <button
          @click="deleteAllTransactions"
          class="px-4 py-2 bg-danger hover:bg-danger/90 text-white font-medium rounded-lg transition-colors"
        >
          Delete All Transactions
        </button>
      </div>
    </div>


  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useTransactionStore } from '@/stores/transactionStore'
import { useCurrencyStore } from '@/stores/currencyStore'
import { getCategoryIcon } from '@/utils/helpers'
import TransactionCard from '@/components/TransactionCard.vue'
import CategorySelect from '@/components/CategorySelect.vue'
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

const store = useTransactionStore()
const currencyStore = useCurrencyStore()

const filters = ref({
  type: '',
  category: '',
  sort: 'date-desc',
})

onMounted(async () => {
  store.fetchTransactions()
  await currencyStore.initialize()
})

const transactions = computed(() => store.transactions)

const availableCategories = computed(() => {
  const categories = new Set<string>()
  transactions.value.forEach(t => {
    categories.add(t.category)
  })
  return Array.from(categories).sort()
})

const filteredTransactions = computed(() => {
  let filtered = [...transactions.value]

  // Apply type filter
  if (filters.value.type) {
    filtered = filtered.filter(t => t.type === filters.value.type)
  }

  // Apply category filter
  if (filters.value.category) {
    filtered = filtered.filter(t => t.category === filters.value.category)
  }

  // Apply sorting
  switch (filters.value.sort) {
    case 'date-asc':
      filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      break
    case 'amount-desc':
      filtered.sort((a, b) => b.amount - a.amount)
      break
    case 'amount-asc':
      filtered.sort((a, b) => a.amount - b.amount)
      break
    case 'date-desc':
    default:
      filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }

  return filtered
})


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

const resetFilters = () => {
  filters.value = {
    type: '',
    category: '',
    sort: 'date-desc',
  }
}

const deleteTransaction = async (id: string) => {
  if (confirm('Are you sure you want to delete this transaction?')) {
    try {
      await store.deleteTransaction(id)
    } catch (err) {
      console.error('Failed to delete transaction:', err)
    }
  }
}

const deleteAllTransactions = async () => {
  const transactionCount = store.transactions.length
  if (confirm(`Are you sure you want to delete ALL ${transactionCount} transactions? This action cannot be undone.`)) {
    if (confirm('This will permanently delete all your transaction data. Are you absolutely sure?')) {
      try {
        await store.deleteAllTransactions()
        alert('All transactions have been deleted successfully.')
      } catch (err) {
        console.error('Failed to delete all transactions:', err)
        alert('Failed to delete transactions. Please try again.')
      }
    }
  }
}
</script>
