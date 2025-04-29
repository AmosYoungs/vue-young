/*
 * @Description: 
 * @Author: yanggl
 * @Date: 2022-07-26 23:46:18
 * @LastEditTime: 2023-11-14 22:31:33
 */

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './plugins/vant'
import './assets/css/basic.css'
import HyHeader from '@c/HyHeader'
import HyScroll from '@c/HyScroll'
import VConsole from 'vconsole';

const vConsole = new VConsole();
Vue.use(ElementUI);
Vue.component('hy-header',HyHeader)
Vue.component('hy-scroll',HyScroll)
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
