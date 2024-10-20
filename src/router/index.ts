import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: () => import ('../views/HomePage.vue')
  },
  {
    path: '/about',
    component: () => import ('../views/AboutPage.vue')
  },
  {
    path: '/vehicles',
    component: () => import ('../views/MyVehiclesPage.vue')
  },
  {
    path: '/login',
    component: () => import ('../views/LoginPage.vue')
  },
  {
    path: '/register',
    component: () => import ('../views/RegisterPage.vue')
  },
  {
    path: '/account',
    component: () => import ('../views/AccountPage.vue')
  },
  // {
  //   path: '/folder/:id',
  //   component: () => import ('../views/FolderPage.vue')
  // },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
