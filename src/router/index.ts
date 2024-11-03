import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import store from "@/store";
const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: () => import ('../views/HomePage.vue'),
    meta: {unauthenticated: true},
  },
  {
    path: '/about',
    component: () => import ('../views/AboutPage.vue'),
    meta: {unauthenticated: true},
  },
  {
    path: '/login',
    component: () => import ('../views/LoginPage.vue'),
    meta: {unauthenticated: true},
  },
  {
    path: '/register',
    component: () => import ('../views/RegisterPage.vue'),
    meta: {unauthenticated: true},
  },
  {
    path: '/resetPassword',
    component: () => import ('../views/ForgotPasswordPage.vue'),
    meta: {unauthenticated: true},
  },
  {
    path: '/forgot-password',
    component: () => import ('../views/SendForgotPasswordPage.vue'),
    meta: {unauthenticated: true},
  },
  {
    path: '/vehicles',
    component: () => import ('../views/MyVehiclesPage.vue')
  },
  {
    path: '/account',
    component: () => import ('../views/AccountPage.vue')
  },
  {
    path: '/vehicles/add',
    component: () => import ('../views/AddVehiclePage.vue')
  },
  {
    path: '/vehicles/:id',
    component: () => import ('../views/ViewVehiclePage.vue')
  },

  {
    path: '/:pathMatch(.*)*',
    component: () => import ('../views/NotFoundPage.vue')
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = !to.meta.unauthenticated;
  const isAuthenticated = !!store.state.account;
  if (requiresAuth && !isAuthenticated) {
    // Redirect to login if trying to access a protected route without authentication
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    });
  } else {
    // Continue to the requested route
    next();
  }
});

export default router
