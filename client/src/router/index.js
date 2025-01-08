import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import SignPage from '../views/SignPage.vue';
import VerifyPage from '../views/VerifyPage.vue';

const routes = [
  { path: '/', name: 'home', component: HomePage },
  { path: '/sign/:account', name: 'sign', component: SignPage, props: true },
  { path: '/verify/:account', name: 'verify', component: VerifyPage, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;