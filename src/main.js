import { createApp } from 'vue';
import App from './App.vue';

import router from './router';
import store from './store';

async function setApp() {
  const app = createApp(App);
  // 注册 store
  app.use(store);
  // 注册 router
  app.use(router);

  app.mount('#app', true);
}

setApp();
