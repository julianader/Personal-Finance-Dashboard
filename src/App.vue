<template>
  <div class="min-h-screen bg-background-primary">
    <!-- Header -->
    <header class="sticky top-0 z-50 bg-surface-primary border-b border-border-primary shadow-sm transition-colors">
      <div class="max-w-7xl mx-auto mt-2 px-4 py-4 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <div class="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-lg"><a href="/">💸</a></span>
          </div>
          <h1 class="text-2xl mt-3 font-bold text-text-primary"><a href="/">Financial Tracker</a></h1>
        </div>
        <div class="flex items-center gap-4">
          <nav class="hidden md:flex gap-8">
            <router-link
                to="/dashboard"
                :class="['text-sm font-medium transition-colors', isActive('/dashboard') ? 'text-primary-600' : 'text-text-secondary hover:text-text-primary']"
            >
              Dashboard
            </router-link>
            <router-link
                to="/add"
                :class="['text-sm font-medium transition-colors', isActive('/add') ? 'text-primary-600' : 'text-text-secondary hover:text-text-primary']"
            >
              Add Transaction
            </router-link>
            <router-link
                to="/history"
                :class="['text-sm font-medium transition-colors', isActive('/history') ? 'text-primary-600' : 'text-text-secondary hover:text-text-primary']"
            >
              History
            </router-link>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 py-8">
      <router-view />
    </main>

    <!-- Mobile Bottom Navigation (Placeholder) -->
    <nav class="md:hidden fixed bottom-0 left-0 right-0 bg-surface-primary border-t border-border-primary shadow-lg transition-colors">
      <div class="flex justify-around">
        <router-link
            to="/dashboard"
            :class="['flex-1 py-3 text-center transition-colors', isActive('/dashboard') ? 'text-primary-600 border-t-2 border-primary-600' : 'text-text-secondary']"
        >
          <span class="text-xl">📊</span>
          <p class="text-xs mt-1">Dashboard</p>
        </router-link>
        <router-link
            to="/add"
            :class="['flex-1 py-3 text-center transition-colors', isActive('/add') ? 'text-primary-600 border-t-2 border-primary-600' : 'text-text-secondary']"
        >
          <span class="text-xl">➕</span>
          <p class="text-xs mt-1">Add</p>
        </router-link>
        <router-link
            to="/history"
            :class="['flex-1 py-3 text-center transition-colors', isActive('/history') ? 'text-primary-600 border-t-2 border-primary-600' : 'text-text-secondary']"
        >
          <span class="text-xl">📋</span>
          <p class="text-xs mt-1">History</p>
        </router-link>
      </div>
    </nav>

    <!-- Mobile spacing for bottom nav -->
    <div class="md:hidden h-20"></div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import ThemeToggle from '@/components/ThemeToggle.vue'

const route = useRoute()

const isActive = (path: string) => {
  return route.path === path
}
</script>

<style scoped>
/* Smooth transitions for router links */
a {
  transition: all 0.2s ease-in-out;
}
</style>
