/*
 * @Description: 
 * @Author: yanggl
 * @Date: 2022-07-26 23:46:18
 * @LastEditTime: 2022-12-17 22:15:01
 */

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/vant'
import './assets/css/basic.css'
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
