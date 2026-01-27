import { describe, expect, it } from 'vitest'
import { formatCurrency, formatDate, isValidAmount } from '@/utils/helpers'

describe('Helper Functions', () => {
  it('formats currency correctly (USD)', () => {
    expect(formatCurrency(1234.56, 'USD')).toBe('$1,234.56')
  })

  it('formats currency correctly (EUR)', () => {
    // Note: The simple helper uses Intl.NumberFormat, which may vary by environment.
    // We test against a common format.
    expect(formatCurrency(1234.56, 'EUR')).toContain('€1,234.56')
  })

  it('formats date correctly', () => {
    expect(formatDate('2024-01-15T10:00:00Z')).toBe('Jan 15, 2024')
  })

  it('validates positive amount', () => {
    expect(isValidAmount(100)).toBe(true)
    expect(isValidAmount('50.5')).toBe(true)
  })

  it('invalidates zero or negative amount', () => {
    expect(isValidAmount(0)).toBe(false)
    expect(isValidAmount(-10)).toBe(false)
  })

  it('invalidates non-numeric input', () => {
    expect(isValidAmount('abc')).toBe(false)
    expect(isValidAmount(NaN)).toBe(false)
  })
})
