import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/HomePage.vue';
import ImageSignPage from '../components/ImageSignPage.vue';
import ImageVerifyPage from '../components/ImageVerifyPage.vue';

const routes = [
  {
    path: '/',  // 这里可以配置你希望访问该页面的路径
    name: 'Home', // 给这个路由起个名字
    component: HomePage,  // 配置组件对应的路径
  },
  {
    path: '/sign',
    name: 'ImageSign',
    component: ImageSignPage,
    props: route => ({ account: route.query })
  },
  {
    path: '/verify',
    name: 'ImageVerify',
    component: ImageVerifyPage,
    props: route => ({ account: route.query })
  }
];

const router = createRouter({
  history: createWebHistory('/'),
  routes
});

export default router;