<template>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div
        v-for="stat in stats"
        :key="stat.label"
        :class="[
          'rounded-xl p-6 shadow-sm',
          stat.variant === 'gradient'
            ? 'bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-lg'
            : 'bg-surface-primary border border-border-primary hover:shadow-md transition-shadow'
        ]"
      >
        <p :class="[
          'text-sm font-medium',
          stat.variant === 'gradient' ? 'opacity-90' : 'text-text-secondary'
        ]">
          {{ stat.label }}
        </p>
        <h3 :class="[
          'text-3xl font-bold mt-2',
          stat.variant === 'gradient' ? 'text-white' : 'text-text-primary'
        ]">
          {{ stat.value }}
        </h3>
        <div v-if="stat.progress !== undefined" class="mt-4 h-2 bg-surface-hover rounded-full overflow-hidden">
          <div
            class="h-full rounded-full"
            :class="stat.progressColor || 'bg-current'"
            :style="{ width: stat.progress + '%' }"
          ></div>
        </div>
        <p v-if="stat.subtitle" :class="[
          'text-xs mt-4',
          stat.variant === 'gradient' ? 'opacity-75' : 'text-text-tertiary'
        ]">
          {{ stat.subtitle }}
        </p>
      </div>
    </div>
  </template>

  <script setup lang="ts">
  export interface StatItem {
    label: string
    value: string
    variant?: 'default' | 'gradient'
    progress?: number
    progressColor?: string
    subtitle?: string
  }

  interface Props {
    stats: StatItem[]
  }

  defineProps<Props>()
  </script>
