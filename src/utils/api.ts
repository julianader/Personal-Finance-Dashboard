import type { Transaction, ExchangeRates } from '@/types'

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
  {
    id: '3',
    type: 'expense',
    amount: 150,
    category: 'groceries',
    description: 'Weekly groceries',
    date: '2024-01-10',
    createdAt: '2024-01-10T10:00:00Z',
  },
  {
    id: '4',
    type: 'expense',
    amount: 50,
    category: 'utilities',
    description: 'Electricity bill',
    date: '2024-01-12',
    createdAt: '2024-01-12T10:00:00Z',
  },
  {
    id: '5',
    type: 'expense',
    amount: 30,
    category: 'entertainment',
    description: 'Movie tickets',
    date: '2024-01-14',
    createdAt: '2024-01-14T10:00:00Z',
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
          // Data exists (including empty array) - return it
          resolve(JSON.parse(stored))
        } else {
          // First time - load mock data
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

  // Delete a transaction
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


  // Delete all transactions
  async deleteAllTransactions(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.setItem('transactions', JSON.stringify([]))
        resolve()
      }, 300)
    })
  },

  // Get exchange rates from Open Exchange Rates API
  async getExchangeRates(): Promise<ExchangeRates> {
    const appId = 'f8c6b76e1ea24e3d821c4bcbe3083547'
    const response = await fetch(`https://openexchangerates.org/api/latest.json?app_id=${appId}`)

    if (!response.ok) {
      throw new Error(`Failed to fetch exchange rates: ${response.status}`)
    }

    const data = await response.json()
    return {
      base: data.base,
      rates: data.rates,
      timestamp: data.timestamp,
    }
  },
}
