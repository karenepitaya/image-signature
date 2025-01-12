import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router';  // 引入路由
import axios from 'axios';

const app = createApp(App);
app.config.globalProperties.$axios = axios;  // 将axios挂载到全局
app.use(router).mount('#app');