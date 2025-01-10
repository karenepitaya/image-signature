import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/', component: () => import('../pages/HomePage.vue') },
  { path: '/sign', component: () => import('../pages/ImageSignPage.vue') },
  { path: '/verify', component: () => import('../pages/ImageVerifyPage.vue') },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;