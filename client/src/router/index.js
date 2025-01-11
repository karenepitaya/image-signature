import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/HomePage.vue';  // 引入你新建的组件

const routes = [
  {
    path: '/',  // 这里可以配置你希望访问该页面的路径
    name: 'Home',
    component: HomePage  // 配置组件对应的路径
  }
];

const router = createRouter({
  history: createWebHistory('/'),
  routes
});

export default router;