import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { ExchangeRates, Currency } from '@/types'
import { SUPPORTED_CURRENCIES } from '@/types'
import { api } from '@/utils/api'

export const useCurrencyStore = defineStore('currency', () => {
  const exchangeRates = ref<ExchangeRates | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const selectedCurrency = ref<Currency>(SUPPORTED_CURRENCIES[0]) // Default to USD
  const baseCurrency: Currency = SUPPORTED_CURRENCIES[0] // USD as base for API

  // Fetch exchange rates from API
  const fetchExchangeRates = async () => {
    loading.value = true
    error.value = null
    try {
      const data = await api.getExchangeRates()
      exchangeRates.value = data
      // Cache rates for 1 hour
      localStorage.setItem('exchangeRates', JSON.stringify(data))
      localStorage.setItem('exchangeRatesTimestamp', Date.now().toString())
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch exchange rates'
      console.error('Error fetching exchange rates:', err)
      // Try to load from cache if API fails
      loadCachedRates()
    } finally {
      loading.value = false
    }
  }

  // Load cached exchange rates
  const loadCachedRates = () => {
    const cached = localStorage.getItem('exchangeRates')
    const timestamp = localStorage.getItem('exchangeRatesTimestamp')

    if (cached && timestamp) {
      const cacheAge = Date.now() - parseInt(timestamp)
      // Use cache if less than 1 hour old
      if (cacheAge < 60 * 60 * 1000) {
        exchangeRates.value = JSON.parse(cached)
      }
    }
  }

  // Set selected currency
  const setSelectedCurrency = (currency: Currency) => {
    selectedCurrency.value = currency
    localStorage.setItem('selectedCurrency', JSON.stringify(currency))
  }

  // Load selected currency from localStorage
  const loadSelectedCurrency = () => {
    const cached = localStorage.getItem('selectedCurrency')
    if (cached) {
      try {
        const currency = JSON.parse(cached)
        const found = SUPPORTED_CURRENCIES.find(c => c.code === currency.code)
        if (found) {
          selectedCurrency.value = found
        }
      } catch (err) {
        console.error('Error loading selected currency:', err)
      }
    }
  }

  // Convert amount from base currency (USD) to selected currency
  const convertFromBase = (amount: number): number => {
    if (!exchangeRates.value || selectedCurrency.value.code === baseCurrency.code) {
      return amount
    }

    const rate = exchangeRates.value.rates[selectedCurrency.value.code]
    if (!rate) {
      console.warn(`Exchange rate not found for ${selectedCurrency.value.code}`)
      return amount
    }

    return amount * rate
  }

  // Convert amount from selected currency to base currency (USD)
  const convertToBase = (amount: number): number => {
    if (!exchangeRates.value || selectedCurrency.value.code === baseCurrency.code) {
      return amount
    }

    const rate = exchangeRates.value.rates[selectedCurrency.value.code]
    if (!rate) {
      console.warn(`Exchange rate not found for ${selectedCurrency.value.code}`)
      return amount
    }

    return amount / rate
  }

  // Convert amount from any currency to base currency (USD)
  const convertToBaseFrom = (amount: number, fromCurrency: string): number => {
    if (!exchangeRates.value || fromCurrency === baseCurrency.code) {
      return amount
    }

    const rate = exchangeRates.value.rates[fromCurrency]
    if (!rate) {
      console.warn(`Exchange rate not found for ${fromCurrency}`)
      return amount
    }

    return amount / rate
  }

  // Get exchange rate between two currencies
  const getExchangeRate = (fromCurrency: string, toCurrency: string): number => {
    if (!exchangeRates.value) return 1

    if (fromCurrency === toCurrency) return 1

    const fromRate = fromCurrency === baseCurrency.code ? 1 : exchangeRates.value.rates[fromCurrency]
    const toRate = toCurrency === baseCurrency.code ? 1 : exchangeRates.value.rates[toCurrency]

    if (!fromRate || !toRate) {
      console.warn(`Exchange rate not found for ${fromCurrency} or ${toCurrency}`)
      return 1
    }

    return toRate / fromRate
  }

  // Check if rates are stale (older than 1 hour)
  const isRatesStale = computed(() => {
    if (!exchangeRates.value) return true
    const cacheTimestamp = localStorage.getItem('exchangeRatesTimestamp')
    if (!cacheTimestamp) return true

    const cacheAge = Date.now() - parseInt(cacheTimestamp)
    return cacheAge > 60 * 60 * 1000 // 1 hour
  })

  // Initialize store
  const initialize = async () => {
    loadSelectedCurrency()
    loadCachedRates()

    // Fetch fresh rates if stale or missing
    if (isRatesStale.value) {
      await fetchExchangeRates()
    }
  }

  return {
    exchangeRates,
    loading,
    error,
    selectedCurrency,
    baseCurrency,
    fetchExchangeRates,
    setSelectedCurrency,
    convertFromBase,
    convertToBase,
    convertToBaseFrom,
    getExchangeRate,
    isRatesStale,
    initialize,
    SUPPORTED_CURRENCIES: SUPPORTED_CURRENCIES,
  }
})
