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
    meta: {unauthenticated: true, entirePage: true},
  },
  {
    path: '/register',
    component: () => import ('../views/RegisterPage.vue'),
    meta: {unauthenticated: true, entirePage: true},
  },
  {
    path: '/resetPassword',
    component: () => import ('../views/ForgotPasswordPage.vue'),
    meta: {unauthenticated: true, entirePage: true},
  },
  {
    path: '/forgot-password',
    component: () => import ('../views/SendForgotPasswordPage.vue'),
    meta: {unauthenticated: true, entirePage: true},
  },
  {
    path: '/google-auth-success',
    component: () => import ('../views/GoogleAuthSuccess.vue'),
    meta: {unauthenticated: true},
  },
  {
    path: '/verifyEmail',
    component: () => import ('../views/VerifyEmail.vue'),
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
    path: '/vehicles/create-maintenance-record/:vehicleId',
    component: () => import ('../views/CreateMaintenanceRecordPage.vue')
  },
  {
    path: '/vehicles/edit-maintenance-record/:vehicleId/:recordId',
    component: () => import ('../views/CreateMaintenanceRecordPage.vue')
  },
  {
    path: '/vehicles/view-maintenance-record/:recordId',
    component: () => import ('../views/ViewMaintenanceRecord.vue')
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
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    });
  } else {
    next();
  }
});

export default router
