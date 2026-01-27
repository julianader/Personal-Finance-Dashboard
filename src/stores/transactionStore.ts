import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Transaction, DashboardStats, CategoryBreakdown } from '@/types'
import { api } from '@/utils/api'
import { CATEGORY_COLORS } from '@/utils/helpers' // Will be used later

export const useTransactionStore = defineStore('transactions', () => {
  const transactions = ref<Transaction[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  // Currency store will be added later

  // Fetch all transactions from API
  const fetchTransactions = async () => {
    loading.value = true
    error.value = null
    try {
      const data = await api.getTransactions()
      transactions.value = data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch transactions'
      console.error('Error fetching transactions:', err)
    } finally {
      loading.value = false
    }
  }

  // Add new transaction
  const addTransaction = async (transaction: Omit<Transaction, 'id' | 'createdAt'>) => {
    loading.value = true
    error.value = null
    try {
      const newTransaction = await api.createTransaction({
        ...transaction,
        createdAt: new Date().toISOString(),
      })
      transactions.value.push(newTransaction)
      return newTransaction
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to add transaction'
      console.error('Error adding transaction:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Delete transaction
  const deleteTransaction = async (id: string) => {
    loading.value = true
    error.value = null
    try {
      await api.deleteTransaction(id)
      transactions.value = transactions.value.filter(t => t.id !== id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to delete transaction'
      console.error('Error deleting transaction:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Delete all transactions
  const deleteAllTransactions = async () => {
    loading.value = true
    error.value = null
    try {
      await api.deleteAllTransactions()
      transactions.value = []
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to delete all transactions'
      console.error('Error deleting all transactions:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Computed: Total income (in base currency)
  const totalIncome = computed(() => {
    return transactions.value
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0)
  })

  // Computed: Total expenses (in base currency)
  const totalExpenses = computed(() => {
    return transactions.value
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0)
  })

  // Computed: Balance (in base currency)
  const balance = computed(() => {
    return totalIncome.value - totalExpenses.value
  })

  // Computed: Dashboard stats
  const dashboardStats = computed<DashboardStats>(() => ({
    totalIncome: totalIncome.value,
    totalExpenses: totalExpenses.value,
    balance: balance.value,
    transactionCount: transactions.value.length,
    savingsRate: totalIncome.value > 0 ? (balance.value / totalIncome.value) * 100 : 0,
  }))

  // Computed: Category breakdown (placeholder for now)
  const expenseCategoryBreakdown = computed<CategoryBreakdown[]>(() => {
    return []
  })


  // Computed: Recent transactions (last 10)
  const recentTransactions = computed(() => {
    return [...transactions.value]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 10)
  })

  return {
    transactions,
    loading,
    error,
    fetchTransactions,
    addTransaction,
    deleteTransaction,
    deleteAllTransactions,
    totalIncome,
    totalExpenses,
    balance,
    dashboardStats,
    expenseCategoryBreakdown,
    recentTransactions,
  }
})
