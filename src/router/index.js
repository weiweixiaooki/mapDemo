// @ts-ignore
import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  // @ts-ignore
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      // @ts-ignore
      component: () => import('../views/MapPage.vue')
    },
  ]
})

export default router