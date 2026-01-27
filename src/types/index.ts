export interface Transaction {
  id: string
  type: 'income' | 'expense'
  amount: number // Amount in base currency (USD)
  originalAmount?: number // Original amount in the selected currency
  originalCurrency?: string // Original currency code (e.g., 'EUR', 'GBP')
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

export interface ExchangeRates {
  base: string
  rates: Record<string, number>
  timestamp: number
}

export interface Currency {
  code: string
  name: string
  symbol: string
  flag?: string
}

export const SUPPORTED_CURRENCIES: Currency[] = [
  { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
  { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺' },
  { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', flag: '🇨🇦' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF', flag: '🇨🇭' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', flag: '🇨🇳' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', flag: '🇮🇳' },
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$', flag: '🇧🇷' },
  { code: 'EGP', name: 'Egyptian Pound', symbol: 'E£', flag: '🇪🇬' },
  { code: 'RUB', name: 'Russian Ruble', symbol: '₽', flag: '🇷🇺' },
]
