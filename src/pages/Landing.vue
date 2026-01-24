<template>
  <div class="min-h-screen relative bg-background-primary">
    <!-- Background decoration -->
    <div class="absolute inset-0 pointer-events-none overflow-visible">
      <div class="absolute -top-48 -left-48 w-96 h-96 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      <div class="absolute top-1/4 -right-48 w-96 h-96 bg-accent-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
      <div class="absolute -bottom-48 -left-96 w-96 h-96 bg-primary-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
    </div>

    <!-- Hero Section -->
    <section class="relative overflow-hidden">
      <div class="relative w-full px-4 py-20 lg:py-32 bg-transparent">
        <div class="text-center">
          <!-- Logo and Brand -->
          <div class="flex items-center justify-center gap-3 mb-10 animate-fade-in">
            <div class="w-16 h-16 mb-4 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center shadow-lg">
              <span class="text-white font-bold text-2xl">💸</span>
            </div>
            <h1 class="text-4xl lg:text-6xl font-bold text-gradient">Personal Financial Tracker</h1>
          </div>

          <!-- Hero Headline -->
          <h2 class="text-4xl lg:text-7xl font-bold text-text-primary mb-6 animate-slide-up">
            Take Control of Your
            <span class="block text-gradient">Financial Future</span>
          </h2>

          <!-- Hero Description -->
          <p class="text-xl lg:text-2xl text-text-secondary mb-12 max-w-3xl mx-auto leading-relaxed animate-slide-up delay-200">
            Track expenses, monitor income, and achieve your financial goals with our intuitive and powerful finance management platform.
          </p>

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up delay-400">
            <router-link
                to="/dashboard"
                class="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold px-8 py-4 rounded-xl text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              Get Started Free
            </router-link>
            <button class="border-2 border-border-primary hover:border-primary-400 text-text-primary hover:text-primary-600 font-semibold px-8 py-4 rounded-xl text-lg transition-all duration-200">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>