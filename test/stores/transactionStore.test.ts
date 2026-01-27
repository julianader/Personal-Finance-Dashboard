import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useTransactionStore } from '@/stores/transactionStore'

describe('Transaction Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('initializes with empty transactions', () => {
    const store = useTransactionStore()
    expect(store.transactions).toEqual([])
    expect(store.loading).toBe(false)
    expect(store.error).toBeNull()
  })

  it('calculates total income correctly', () => {
    const store = useTransactionStore()
    store.transactions = [
      {
        id: '1',
        type: 'income',
        amount: 1000,
        category: 'salary',
        description: 'Test income',
        date: '2024-01-01',
        createdAt: '2024-01-01T00:00:00Z',
      },
      {
        id: '2',
        type: 'income',
        amount: 500,
        category: 'freelance',
        description: 'Test freelance',
        date: '2024-01-02',
        createdAt: '2024-01-02T00:00:00Z',
      },
    ]
    expect(store.totalIncome).toBe(1500)
  })

  it('calculates total expenses correctly', () => {
    const store = useTransactionStore()
    store.transactions = [
      {
        id: '1',
        type: 'expense',
        amount: 100,
        category: 'groceries',
        description: 'Test expense',
        date: '2024-01-01',
        createdAt: '2024-01-01T00:00:00Z',
      },
      {
        id: '2',
        type: 'expense',
        amount: 200,
        category: 'rent',
        description: 'Test rent',
        date: '2024-01-02',
        createdAt: '2024-01-02T00:00:00Z',
      },
    ]
    expect(store.totalExpenses).toBe(300)
  })

  it('calculates balance correctly', () => {
    const store = useTransactionStore()
    store.transactions = [
      {
        id: '1',
        type: 'income',
        amount: 1000,
        category: 'salary',
        description: 'Test income',
        date: '2024-01-01',
        createdAt: '2024-01-01T00:00:00Z',
      },
      {
        id: '2',
        type: 'expense',
        amount: 300,
        category: 'rent',
        description: 'Test expense',
        date: '2024-01-02',
        createdAt: '2024-01-02T00:00:00Z',
      },
    ]
    expect(store.balance).toBe(700)
  })

  it('calculates savings rate correctly', () => {
    const store = useTransactionStore()
    store.transactions = [
      {
        id: '1',
        type: 'income',
        amount: 1000,
        category: 'salary',
        description: 'Test income',
        date: '2024-01-01',
        createdAt: '2024-01-01T00:00:00Z',
      },
      {
        id: '2',
        type: 'expense',
        amount: 300,
        category: 'rent',
        description: 'Test expense',
        date: '2024-01-02',
        createdAt: '2024-01-02T00:00:00Z',
      },
    ]
    expect(store.dashboardStats.savingsRate).toBe(70) // (1000 - 300) / 1000 * 100
  })

  it('returns recent transactions in correct order', () => {
    const store = useTransactionStore()
    store.transactions = [
      {
        id: '1',
        type: 'income',
        amount: 1000,
        category: 'salary',
        description: 'Test income 1',
        date: '2024-01-01',
        createdAt: '2024-01-01T00:00:00Z',
      },
      {
        id: '2',
        type: 'expense',
        amount: 300,
        category: 'rent',
        description: 'Test expense 2',
        date: '2024-01-05',
        createdAt: '2024-01-05T00:00:00Z',
      },
      {
        id: '3',
        type: 'expense',
        amount: 100,
        category: 'groceries',
        description: 'Test expense 3',
        date: '2024-01-03',
        createdAt: '2024-01-03T00:00:00Z',
      },
    ]
    const recent = store.recentTransactions
    expect(recent[0].id).toBe('2') // Most recent
    expect(recent[1].id).toBe('3')
    expect(recent[2].id).toBe('1')
  })

  it('categorizes expenses correctly', () => {
    const store = useTransactionStore()
    store.transactions = [
      {
        id: '1',
        type: 'expense',
        amount: 100,
        category: 'groceries',
        description: 'Test',
        date: '2024-01-01',
        createdAt: '2024-01-01T00:00:00Z',
      },
      {
        id: '2',
        type: 'expense',
        amount: 200,
        category: 'groceries',
        description: 'Test',
        date: '2024-01-02',
        createdAt: '2024-01-02T00:00:00Z',
      },
      {
        id: '3',
        type: 'expense',
        amount: 400,
        category: 'rent',
        description: 'Test',
        date: '2024-01-03',
        createdAt: '2024-01-03T00:00:00Z',
      },
    ]
    const breakdown = store.expenseCategoryBreakdown
    expect(breakdown.length).toBe(2)
    // Breakdown is sorted by amount descending, so rent (400) comes before groceries (300)
    expect(breakdown[0].category).toBe('rent')
    expect(breakdown[0].amount).toBe(400)
    expect(breakdown[1].category).toBe('groceries')
    expect(breakdown[1].amount).toBe(300)
  })

  it('generates monthly summary correctly', () => {
    const store = useTransactionStore()
    store.transactions = [
      {
        id: '1',
        type: 'income',
        amount: 1000,
        category: 'salary',
        description: 'Test',
        date: '2024-01-15',
        createdAt: '2024-01-15T00:00:00Z',
      },
      {
        id: '2',
        type: 'expense',
        amount: 300,
        category: 'rent',
        description: 'Test',
        date: '2024-01-20',
        createdAt: '2024-01-20T00:00:00Z',
      },
      {
        id: '3',
        type: 'income',
        amount: 500,
        category: 'freelance',
        description: 'Test',
        date: '2024-02-10',
        createdAt: '2024-02-10T00:00:00Z',
      },
    ]
    const summary = store.monthlySummary
    expect(summary.length).toBe(2)
    expect(summary[0].month).toBe('2024-01')
    expect(summary[0].income).toBe(1000)
    expect(summary[0].expenses).toBe(300)
    expect(summary[1].month).toBe('2024-02')
    expect(summary[1].income).toBe(500)
    expect(summary[1].expenses).toBe(0)
  })
})
