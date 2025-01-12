import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/HomePage.vue';

const routes = [
  {
    path: '/',  // 这里可以配置你希望访问该页面的路径
    name: 'Home', // 给这个路由起个名字
    component: HomePage  // 配置组件对应的路径
  },
];

const router = createRouter({
  history: createWebHistory('/'),
  routes
});

export default router;