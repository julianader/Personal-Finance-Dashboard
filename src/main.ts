import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './styles/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// Initialize theme store to apply saved theme on app startup
import { useThemeStore } from '@/stores/themeStore'
useThemeStore()

app.mount('#app')
