import { setActivePinia, createPinia } from 'pinia'
import { useTransactionStore } from '@/stores/transactionStore'
import { beforeEach, describe, expect, it, vi } from 'vitest'

// Mock localStorage and api for testing
const mockTransactions = [
  { id: '1', type: 'income', amount: 1000, category: 'salary', description: 'Salary', date: '2024-01-01', createdAt: '2024-01-01T00:00:00Z' },
  { id: '2', type: 'expense', amount: 200, category: 'rent', description: 'Rent', date: '2024-01-05', createdAt: '2024-01-05T00:00:00Z' },
  { id: '3', type: 'expense', amount: 50, category: 'groceries', description: 'Food', date: '2024-01-10', createdAt: '2024-01-10T00:00:00Z' },
]

vi.mock('@/utils/api', () => ({
  api: {
    getTransactions: vi.fn(() => Promise.resolve(mockTransactions)),
    createTransaction: vi.fn((t) => Promise.resolve({ ...t, id: '4', createdAt: new Date().toISOString() })),
    deleteTransaction: vi.fn(() => Promise.resolve()),
    deleteAllTransactions: vi.fn(() => Promise.resolve()),
  }
}))

describe('Transaction Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('fetches transactions correctly', async () => {
    const store = useTransactionStore()
    await store.fetchTransactions()
    expect(store.transactions.length).toBe(3)
    expect(store.loading).toBe(false)
  })

  it('calculates dashboard stats correctly', async () => {
    const store = useTransactionStore()
    store.transactions = mockTransactions as any

    expect(store.totalIncome).toBe(1000)
    expect(store.totalExpenses).toBe(250)
    expect(store.balance).toBe(750)
    expect(store.dashboardStats.transactionCount).toBe(3)
    // Savings rate: (750 / 1000) * 100 = 75
    expect(store.dashboardStats.savingsRate).toBe(75)
  })

  it('adds a transaction', async () => {
    const store = useTransactionStore()
    store.transactions = [] as any
    const newTransaction = { type: 'income', amount: 500, category: 'freelance', description: 'Project' } as any
    await store.addTransaction(newTransaction)
    expect(store.transactions.length).toBe(1)
    expect(store.transactions[0].amount).toBe(500)
  })

  it('deletes a transaction', async () => {
    const store = useTransactionStore()
    store.transactions = mockTransactions as any
    await store.deleteTransaction('1')
    expect(store.transactions.length).toBe(2)
    expect(store.transactions.some(t => t.id === '1')).toBe(false)
  })
})
