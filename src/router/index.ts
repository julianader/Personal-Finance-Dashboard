import { createRouter, createWebHistory } from 'vue-router'
import Landing from '@/pages/Landing.vue'
import Dashboard from '@/pages/Dashboard.vue'
import AddTransaction from '@/pages/AddTransaction.vue'
import History from '@/pages/History.vue'

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: Landing,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
  },
  {
    path: '/add',
    name: 'AddTransaction',
    component: AddTransaction,
  },
  {
    path: '/history',
    name: 'History',
    component: History,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
