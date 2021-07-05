import { createRouter, createWebHistory } from 'vue-router'

import { Home, Welcome } from '@/pages'
import { routeNames } from '@/constants'

const routes = [
  {
    path: routeNames.welcome,
    component: Welcome,
    name: 'Welcome',
  },
  {
    path: routeNames.home,
    component: Home,
    name: 'Home',
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router