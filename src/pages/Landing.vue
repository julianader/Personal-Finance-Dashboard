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

    <!-- Features Section -->
    <section class="py-20 lg:py-32 bg-background-primary">
      <div class="w-full px-4">
        <div class="text-center mb-16">
          <h3 class="text-3xl lg:text-5xl font-bold text-text-primary mb-6">
            Everything You Need to
            <span class="text-gradient">Manage Your Money</span>
          </h3>
          <p class="text-xl text-text-secondary max-w-2xl mx-auto">
            Powerful features designed to help you understand, track, and optimize your financial health.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Feature 1 -->
          <div class="bg-surface-primary border border-border-primary rounded-2xl p-8 hover:shadow-xl hover:border-primary-200 transition-all duration-300 group animate-fade-in">
            <div class="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <span class="text-3xl">📊</span>
            </div>
            <h4 class="text-2xl font-bold text-text-primary mb-4">Smart Dashboard</h4>
            <p class="text-text-secondary leading-relaxed">
              Get a comprehensive overview of your financial health with beautiful charts, spending breakdowns, and savings insights.
            </p>
          </div>

          <!-- Feature 2 -->
          <div class="bg-surface-primary border border-border-primary rounded-2xl p-8 hover:shadow-xl hover:border-primary-200 transition-all duration-300 group animate-fade-in delay-200">
            <div class="w-16 h-16 bg-gradient-to-br from-accent-100 to-accent-200 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <span class="text-3xl">💰</span>
            </div>
            <h4 class="text-2xl font-bold text-text-primary mb-4">Easy Tracking</h4>
            <p class="text-text-secondary leading-relaxed">
              Quickly add income and expenses with smart categorization and detailed transaction history.
            </p>
          </div>

          <!-- Feature 3 -->
          <div class="bg-surface-primary border border-border-primary rounded-2xl p-8 hover:shadow-xl hover:border-primary-200 transition-all duration-300 group animate-fade-in delay-400">
            <div class="w-16 h-16 bg-gradient-to-br from-success to-success/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <span class="text-3xl">🎯</span>
            </div>
            <h4 class="text-2xl font-bold text-text-primary mb-4">Savings Goals</h4>
            <p class="text-text-secondary leading-relaxed">
              Set and track savings goals with visual progress indicators and automated calculations.
            </p>
          </div>

          <!-- Feature 4 -->
          <div class="bg-surface-primary border border-border-primary rounded-2xl p-8 hover:shadow-xl hover:border-primary-200 transition-all duration-300 group animate-fade-in delay-600">
            <div class="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <span class="text-3xl">📱</span>
            </div>
            <h4 class="text-2xl font-bold text-text-primary mb-4">Mobile First</h4>
            <p class="text-text-secondary leading-relaxed">
              Access your finances anywhere with our responsive design optimized for mobile and desktop.
            </p>
          </div>

          <!-- Feature 5 -->
          <div class="bg-surface-primary border border-border-primary rounded-2xl p-8 hover:shadow-xl hover:border-primary-200 transition-all duration-300 group animate-fade-in delay-800">
            <div class="w-16 h-16 bg-gradient-to-br from-accent-100 to-accent-200 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <span class="text-3xl">🔒</span>
            </div>
            <h4 class="text-2xl font-bold text-text-primary mb-4">Secure & Private</h4>
            <p class="text-text-secondary leading-relaxed">
              Your financial data is encrypted and stored securely. We never share your personal information.
            </p>
          </div>

          <!-- Feature 6 -->
          <div class="bg-surface-primary border border-border-primary rounded-2xl p-8 hover:shadow-xl hover:border-primary-200 transition-all duration-300 group animate-fade-in delay-1000">
            <div class="w-16 h-16 bg-gradient-to-br from-success to-success/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <span class="text-3xl">⚡</span>
            </div>
            <h4 class="text-2xl font-bold text-text-primary mb-4">Lightning Fast</h4>
            <p class="text-text-secondary leading-relaxed">
              Built with modern technology for instant loading and smooth performance across all devices.
            </p>
          </div>
        </div>
      </div>
    </section>


    <!-- CTA Section -->
    <section class="py-20 lg:py-32 bg-background-secondary">
      <div class="w-full px-4 text-center">
        <h3 class="text-3xl lg:text-5xl font-bold text-text-primary mb-6">
          Ready to Transform Your
          <span class="text-gradient">Financial Life?</span>
        </h3>
        <p class="text-xl text-text-secondary mb-12">
          Start your journey to financial freedom today. It's free, it's easy, and it works.
        </p>
        <router-link
            to="/dashboard"
            class="inline-block bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold px-12 py-5 rounded-xl text-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
        >
          Start Tracking Now
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// No reactive data needed for this landing page
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.8s ease-out forwards;
}

.animate-slide-up {
  animation: slideUp 0.8s ease-out forwards;
}

.delay-200 { animation-delay: 0.2s; }
.delay-400 { animation-delay: 0.4s; }
.delay-600 { animation-delay: 0.6s; }
.delay-800 { animation-delay: 0.8s; }
.delay-1000 { animation-delay: 1.0s; }
.delay-2000 { animation-delay: 2.0s; }
</style>
