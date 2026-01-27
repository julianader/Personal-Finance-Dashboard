export interface Transaction {
  id: string
  type: 'income' | 'expense'
  amount: number // Amount in base currency (USD)
  category: string
  description: string
  date: string
  createdAt: string
}

export interface CategoryBreakdown {
  category: string
  amount: number
  percentage: number
  color: string
  icon: string
}

export interface DashboardStats {
  totalIncome: number
  totalExpenses: number
  balance: number
  transactionCount: number
  savingsRate: number
}

// Currency types will be added later
export interface ExchangeRates {}
export interface Currency {}
export const SUPPORTED_CURRENCIES: Currency[] = []