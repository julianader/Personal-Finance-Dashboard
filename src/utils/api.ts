import type { Transaction } from '@/types'

// Mock data storage
const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'income',
    amount: 2500,
    category: 'salary',
    description: 'Monthly salary',
    date: '2024-01-15',
    createdAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    type: 'expense',
    amount: 1200,
    category: 'rent',
    description: 'Apartment rent',
    date: '2024-01-01',
    createdAt: '2024-01-01T10:00:00Z',
  },
]

// Simulate API calls with localStorage persistence
export const api = {
  // Get all transactions
  async getTransactions(): Promise<Transaction[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const stored = localStorage.getItem('transactions')
        if (stored !== null) {
          resolve(JSON.parse(stored))
        } else {
          localStorage.setItem('transactions', JSON.stringify(mockTransactions))
          resolve(mockTransactions)
        }
      }, 300) // Simulate network delay
    })
  },

  // Create a new transaction
  async createTransaction(transaction: Omit<Transaction, 'id'>): Promise<Transaction> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const stored = localStorage.getItem('transactions')
        const transactions = stored ? JSON.parse(stored) : mockTransactions

        const newTransaction: Transaction = {
          ...transaction,
          id: Date.now().toString(),
        }

        transactions.push(newTransaction)
        localStorage.setItem('transactions', JSON.stringify(transactions))
        resolve(newTransaction)
      }, 300)
    })
  },

  // Placeholder for other API methods
  async deleteTransaction(id: string): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const stored = localStorage.getItem('transactions')
        const transactions = stored ? JSON.parse(stored) : mockTransactions

        const filtered = transactions.filter((t: Transaction) => t.id !== id)
        localStorage.setItem('transactions', JSON.stringify(filtered))
        resolve()
      }, 300)
    })
  },

  async deleteAllTransactions(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.setItem('transactions', JSON.stringify([]))
        resolve()
      }, 300)
    })
  },

  // Placeholder for exchange rates
  async getExchangeRates(): Promise<any> {
    return {}
  },
}
