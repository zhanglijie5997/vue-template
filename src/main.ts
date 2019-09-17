import Vue from 'vue';
import App from './App.vue';
import router from '@/router/router';
import store from '@/store/store';
import './registerServiceWorker';
import './plugins/vant.ts';
import 'amfe-flexible';
import 'static/css/reset.scss';
Vue.config.productionTip = false;

console.log(process.env.NODE_ENV, process.env);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
