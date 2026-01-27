<template>
  <div class="relative">
    <!-- Selected value display -->
    <div
      @click="toggleDropdown"
      class="flex items-center justify-between w-full px-4 py-2 bg-surface-primary border border-border-primary rounded-lg cursor-pointer hover:bg-surface-hover transition-colors"
      :class="{ 'ring-2 ring-primary-500': isOpen }"
      role="combobox"
      :aria-expanded="isOpen"
      aria-haspopup="listbox"
      :aria-label="`Select ${type} category`"
    >
      <div class="flex items-center gap-2">
        <component
          v-if="selectedCategory"
          :is="getCategoryIconComponent(selectedCategory)"
          class="w-5 h-5 text-text-secondary"
        />
        <span class="text-text-primary capitalize">
          {{ selectedCategory ? selectedCategory : 'Select a category' }}
        </span>
      </div>
      <ChevronDownIcon class="w-4 h-4 text-text-secondary transition-transform" :class="{ 'rotate-180': isOpen }" />
    </div>

    <!-- Dropdown menu -->
    <div
      v-if="isOpen"
      class="absolute top-full mt-2 w-full bg-surface-primary border border-border-primary rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto"
      role="listbox"
    >
      <!-- Income Categories -->
      <div v-if="type === 'income'" class="p-2">
        <div class="text-xs text-text-tertiary px-3 py-2 font-medium">Income Categories</div>
        <div
          v-for="category in incomeCategories"
          :key="category"
          @click="selectCategory(category)"
          class="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-surface-hover cursor-pointer transition-colors"
          role="option"
          :aria-selected="selectedCategory === category"
        >
          <component :is="getCategoryIconComponent(category)" class="w-5 h-5 text-text-secondary" />
          <span class="text-text-primary capitalize">{{ category }}</span>
        </div>
      </div>

      <!-- Expense Categories -->
      <div v-else class="p-2">
        <div class="text-xs text-text-tertiary px-3 py-2 font-medium">Expense Categories</div>
        <div
          v-for="category in expenseCategories"
          :key="category"
          @click="selectCategory(category)"
          class="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-surface-hover cursor-pointer transition-colors"
          role="option"
          :aria-selected="selectedCategory === category"
        >
          <component :is="getCategoryIconComponent(category)" class="w-5 h-5 text-text-secondary" />
          <span class="text-text-primary capitalize">{{ category }}</span>
        </div>
      </div>
    </div>

    <!-- Overlay to close dropdown -->
    <div
      v-if="isOpen"
      @click="closeDropdown"
      class="fixed inset-0 z-40"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { ChevronDownIcon } from '@heroicons/vue/24/outline'
import { getCategoryIcon } from '@/utils/helpers'
import {
  ShoppingBagIcon,
  HomeIcon,
  BoltIcon,
  FilmIcon,
  TruckIcon,
  HeartIcon,
  BookOpenIcon,
  BriefcaseIcon,
  ComputerDesktopIcon,
  ChartBarIcon,
  TagIcon,
} from '@heroicons/vue/24/outline'

interface Props {
  modelValue: string
  type: 'income' | 'expense'
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const isOpen = ref(false)

const incomeCategories = ['salary', 'freelance', 'investment', 'other']
const expenseCategories = ['groceries', 'rent', 'utilities', 'entertainment', 'transportation', 'healthcare', 'education', 'other']

const selectedCategory = computed(() => props.modelValue)

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const closeDropdown = () => {
  isOpen.value = false
}

const selectCategory = (category: string) => {
  emit('update:modelValue', category)
  closeDropdown()
}

const getCategoryIconComponent = (category: string) => {
  const iconName = getCategoryIcon(category)
  const icons: Record<string, any> = {
    ShoppingBagIcon,
    HomeIcon,
    BoltIcon,
    FilmIcon,
    TruckIcon,
    HeartIcon,
    BookOpenIcon,
    BriefcaseIcon,
    ComputerDesktopIcon,
    ChartBarIcon,
    TagIcon,
  }
  return icons[iconName] || TagIcon
}

// Close dropdown when clicking outside
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (!target.closest('.relative')) {
    closeDropdown()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
