import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import store from "@/store";

import { IonicVue } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* @import '@ionic/vue/css/palettes/dark.always.css'; */
/* @import '@ionic/vue/css/palettes/dark.class.css'; */
import '@ionic/vue/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import './theme/theme.css';

import axiosInstance from '@/config/axiosConfig';

async function fetchAccountData() {
  const storedAccount = localStorage.getItem("account");
  store.commit('setAccount', JSON.parse(storedAccount));
  if (storedAccount) {
    axiosInstance.get('/api/fetch-account').then((data) => {
      store.commit('setAccount', data.data)
      localStorage.setItem('account', JSON.stringify(data.data));
      axiosInstance.get('/api/refresh-token').then((response) => {
        localStorage.setItem('bearerToken', response.data);
      })
    }).catch(() => {
      localStorage.clear();
      store.commit('setAccount', null);
    })
  }
}

fetchAccountData().finally(() => {
  const app = createApp(App)
      .use(IonicVue)
      .use(router)
      .use(store)

  app.config.globalProperties.$axios = axiosInstance;

  router.isReady().then(() => {
    app.mount('#app');
  });
})


