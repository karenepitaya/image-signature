import { createRouter, createWebHistory } from 'vue-router'; // 导入 Vue 路由器函数
import HomePage from '../views/HomePage.vue'; // 导入 HomePage 组件
import SignPage from '../views/SignPage.vue'; // 导入 SignPage 组件
import VerifyPage from '../views/VerifyPage.vue'; // 导入 VerifyPage 组件

// 定义路由规则
const routes = [
  {
    path: '/', // 路径 /
    name: 'home', // 路由名称为 home
    component: HomePage, // 指定 HomePage 组件为此路径的页面内容
  },
  {
    path: '/sign', // 路径 /sign
    name: 'sign', // 路由名称为 sign
    component: SignPage, // 指定 SignPage 组件为此路径的页面内容
    props: true, // 允许通过路由传递参数
  },
  {
    path: '/verify', // 路径 /verify
    name: 'verify', // 路由名称为 verify
    component: VerifyPage, // 指定 VerifyPage 组件为此路径的页面内容
    props: true, // 允许通过路由传递参数
  },
];

// 创建路由器实例
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // 使用 HTML5 模式的历史记录
  routes, // 使用上面定义的路由规则
});

export default router; // 导出路由器供 Vue 应用使用