import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// 引入 Vuetify
import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';
import { aliases, mdi } from 'vuetify/iconsets/mdi';

const vuetify = createVuetify({
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: {
        mdi,
      },
    },
  });

const app = createApp(App)

app.use(router)
app.use(vuetify);
app.mount('#app')