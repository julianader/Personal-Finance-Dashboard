import { describe, it, expect } from 'vitest'
import {
  formatCurrency,
  formatDate,
  formatDateShort,
  getMonthName,
  getCategoryIcon,
  getCategoryColor,
  isValidEmail,
  isValidAmount,
} from '@/utils/helpers'

describe('Helper Functions', () => {
  describe('formatCurrency', () => {
    it('formats currency correctly', () => {
      expect(formatCurrency(1000)).toBe('$1,000.00')
      expect(formatCurrency(1234.56)).toBe('$1,234.56')
      expect(formatCurrency(0)).toBe('$0.00')
    })
  })

  describe('formatDate', () => {
    it('formats date correctly', () => {
      const result = formatDate('2024-01-15T00:00:00Z')
      expect(result).toContain('Jan')
      expect(result).toContain('15')
      expect(result).toContain('2024')
    })
  })

  describe('formatDateShort', () => {
    it('formats date short correctly', () => {
      const result = formatDateShort('2024-01-15T00:00:00Z')
      expect(result).toBe('01/15')
    })
  })

  describe('getMonthName', () => {
    it('returns correct month name', () => {
      expect(getMonthName('2024-01-15T00:00:00Z')).toBe('January')
      expect(getMonthName('2024-12-25T00:00:00Z')).toBe('December')
    })
  })

  describe('getCategoryIcon', () => {
    it('returns correct icon for category', () => {
      expect(getCategoryIcon('groceries')).toBe('ShoppingBagIcon')
      expect(getCategoryIcon('rent')).toBe('HomeIcon')
      expect(getCategoryIcon('salary')).toBe('BriefcaseIcon')
      expect(getCategoryIcon('unknown')).toBe('TagIcon')
    })
  })

  describe('getCategoryColor', () => {
    it('returns correct color for category', () => {
      expect(getCategoryColor('groceries')).toBe('#10b981')
      expect(getCategoryColor('rent')).toBe('#f97316')
      expect(getCategoryColor('utilities')).toBe('#4f46e5')
    })
  })

  describe('isValidEmail', () => {
    it('validates email correctly', () => {
      expect(isValidEmail('test@example.com')).toBe(true)
      expect(isValidEmail('invalid.email')).toBe(false)
      expect(isValidEmail('test@')).toBe(false)
    })
  })

  describe('isValidAmount', () => {
    it('validates amount correctly', () => {
      expect(isValidAmount(100)).toBe(true)
      expect(isValidAmount('100')).toBe(true)
      expect(isValidAmount(0)).toBe(false)
      expect(isValidAmount(-100)).toBe(false)
      expect(isValidAmount('invalid')).toBe(false)
    })
  })
})
