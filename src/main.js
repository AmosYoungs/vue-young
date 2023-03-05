/*
 * @Description: 
 * @Author: yanggl
 * @Date: 2022-07-26 23:46:18
 * @LastEditTime: 2023-03-04 15:21:35
 */

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/vant'
import './assets/css/basic.css'
import HyHeader from '@c/HyHeader'
import HyScroll from '@c/HyScroll'
Vue.component('hy-header',HyHeader)
Vue.component('hy-scroll',HyScroll)
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
