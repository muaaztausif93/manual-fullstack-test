import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import Toaster from "@meforma/vue-toaster";
import { LoadingPlugin } from 'vue-loading-overlay';
import store from './store/index';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'vue-loading-overlay/dist/css/index.css';
import '@/styles/scss/main.scss';

createApp(App)
.use(router)
.use(Toaster, {
  position: 'top-right'
})
.use(store)
.use(LoadingPlugin)
.mount('#app')
