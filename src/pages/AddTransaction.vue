<template>
  <div class="max-w-2xl mx-auto">
    <div class="mb-8">
      <h2 class="text-3xl font-bold text-text-primary mb-2">Add Transaction</h2>
      <p class="text-text-secondary">Record a new income or expense transaction.</p>
    </div>

    <div class="bg-surface-primary border border-border-primary rounded-xl p-8 shadow-sm">
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Transaction Type -->
        <div>
          <label class="block text-sm font-medium text-text-primary mb-3">Transaction Type</label>
          <div class="flex gap-4">
            <label class="flex items-center gap-3 cursor-pointer">
              <input
                v-model="form.type"
                type="radio"
                value="income"
                class="w-4 h-4 text-primary-600"
              />
              <span class="text-text-primary">Income</span>
            </label>
            <label class="flex items-center gap-3 cursor-pointer">
              <input
                v-model="form.type"
                type="radio"
                value="expense"
                class="w-4 h-4 text-primary-600"
              />
              <span class="text-text-primary">Expense</span>
            </label>
          </div>
        </div>

        <!-- Amount -->
        <div>
          <label for="amount" class="block text-sm font-medium text-text-primary mb-2">Amount (USD)</label>
          <div class="relative">
            <span class="absolute left-3 top-2 text-text-tertiary ">$</span>
            <input
              id="amount"
              v-model="form.amount"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              class="w-full pl-12 pr-4 py-2"
              required
            />
          </div>
          <p v-if="errors.amount" class="mt-1 text-sm text-danger">{{ errors.amount }}</p>
        </div>

        <!-- Transaction Currency (Placeholder for now) -->
        <div>
          <label class="block text-sm font-medium text-text-primary mb-2">Transaction Currency</label>
          <select
            v-model="form.transactionCurrency"
            class="w-full px-4 py-2"
          >
            <option value="USD">🇺🇸 USD - US Dollar</option>
          </select>
          <p class="text-xs text-text-tertiary mt-1">
            Amount is currently stored in USD (base currency)
          </p>
        </div>

        <!-- Category -->
        <div>
          <label class="block text-sm font-medium text-text-primary mb-2">Category</label>
          <CategorySelect
            v-model="form.category"
            :type="form.type"
          />
          <p v-if="errors.category" class="mt-1 text-sm text-danger">{{ errors.category }}</p>
        </div>

        <!-- Description -->
        <div>
          <label for="description" class="block text-sm font-medium text-text-primary mb-2">Description</label>
          <input
            id="description"
            v-model="form.description"
            type="text"
            placeholder="e.g., Weekly groceries, Rent payment"
            class="w-full px-4 py-2"
            required
          />
          <p v-if="errors.description" class="mt-1 text-sm text-danger">{{ errors.description }}</p>
        </div>

        <!-- Date -->
        <div>
          <label for="date" class="block text-sm font-medium text-text-primary mb-2">Date</label>
          <input
            id="date"
            v-model="form.date"
            type="date"
            class="w-full px-4 py-2"
            required
          />
          <p v-if="errors.date" class="mt-1 text-sm text-danger">{{ errors.date }}</p>
        </div>

        <!-- Error Message -->
        <div v-if="submitError" class="p-4 bg-danger bg-opacity-10 border border-danger border-opacity-20 rounded-lg">
          <p class="text-sm text-danger">{{ submitError }}</p>
        </div>

        <!-- Success Message -->
        <div v-if="submitSuccess" class="p-4 bg-success bg-opacity-10 border border-success border-opacity-20 rounded-lg">
          <p class="text-sm text-success">✓ Transaction added successfully!</p>
        </div>

        <!-- Submit Button -->
        <div class="flex gap-4 pt-4">
          <button
            type="submit"
            :disabled="isLoading"
            class="flex-1 bg-primary-600 hover:bg-primary-700 disabled:bg-surface-hover disabled:text-text-tertiary text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            {{ isLoading ? 'Adding...' : 'Add Transaction' }}
          </button>
          <router-link
            to="/"
            class="flex-1 bg-surface-secondary hover:bg-surface-hover text-text-primary font-medium py-2 px-4 rounded-lg transition-colors text-center"
          >
            Cancel
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useTransactionStore } from '@/stores/transactionStore'
import { isValidAmount } from '@/utils/helpers'
import CategorySelect from '@/components/CategorySelect.vue'

const router = useRouter()
const store = useTransactionStore()

const form = ref({
  type: 'expense' as 'income' | 'expense',
  amount: '',
  category: '',
  description: '',
  date: new Date().toISOString().split('T')[0],
  transactionCurrency: 'USD', // Hardcoded to USD for now
})

const errors = ref({
  amount: '',
  category: '',
  description: '',
  date: '',
})

const submitError = ref('')
const submitSuccess = ref(false)
const isLoading = computed(() => store.loading)

const validateForm = (): boolean => {
  errors.value = {
    amount: '',
    category: '',
    description: '',
    date: '',
  }

  let isValid = true

  if (!form.value.amount || !isValidAmount(form.value.amount)) {
    errors.value.amount = 'Please enter a valid amount'
    isValid = false
  }

  if (!form.value.category) {
    errors.value.category = 'Please select a category'
    isValid = false
  }

  if (!form.value.description.trim()) {
    errors.value.description = 'Please enter a description'
    isValid = false
  }

  if (!form.value.date) {
    errors.value.date = 'Please select a date'
    isValid = false
  }

  return isValid
}

const handleSubmit = async () => {
  submitError.value = ''
  submitSuccess.value = false

  if (!validateForm()) {
    return
  }

  try {
    const originalAmount = parseFloat(form.value.amount)

    await store.addTransaction({
      type: form.value.type,
      amount: originalAmount, // No conversion yet, amount is in USD
      category: form.value.category,
      description: form.value.description,
      date: form.value.date as string,
    })

    // Reset form
    form.value.amount = ''
    form.value.category = ''
    form.value.description = ''
    form.value.date = new Date().toISOString().split('T')[0]

    // Redirect to dashboard immediately
    router.push('/dashboard')

  } catch (err) {
    submitError.value = err instanceof Error ? err.message : 'Failed to add transaction'
  }
}
</script>
