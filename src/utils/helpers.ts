/**
 * Format currency amount with specified currency
 */
export function formatCurrency(amount: number, currency: string = 'USD', locale: string = 'en-US'): string {
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
    }).format(amount)
  } catch (error) {
    // Fallback if currency is not supported
    console.warn(`Currency ${currency} not supported, falling back to USD`)
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  }
}

/**
 * Format date to readable format
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date)
}


/**
 * Get category icon name
 */
export function getCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    groceries: 'ShoppingBagIcon',
    rent: 'HomeIcon',
    utilities: 'BoltIcon',
    entertainment: 'FilmIcon',
    transportation: 'TruckIcon',
    healthcare: 'HeartIcon',
    education: 'BookOpenIcon',
    salary: 'BriefcaseIcon',
    freelance: 'ComputerDesktopIcon',
    investment: 'ChartBarIcon',
    other: 'TagIcon',
  }
  return icons[category.toLowerCase()] || 'TagIcon'
}



/**
 * Validate amount (positive number)
 */
export function isValidAmount(amount: string | number): boolean {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount
  return !isNaN(num) && num > 0
}

/**
 * Category color constants
 */
export const CATEGORY_COLORS: Record<string, string> = {
  groceries: '#10b981',
  rent: '#f97316',
  utilities: '#4f46e5',
  entertainment: '#ec4899',
  transportation: '#06b6d4',
  healthcare: '#ef4444',
  education: '#8b5cf6',
  salary: '#10b981',
  freelance: '#10b981',
  investment: '#10b981',
  other: '#6b7280',
} as const
