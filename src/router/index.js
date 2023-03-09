import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('../views/index.vue')
  },
  {
    path:'/showCamera',
    name:'showCamera',
    component: ()=> import('../views/demoPage/showCamera.vue')
  },// 
  {
    path:'/eSignature',
    name:'eSignature',
    component: ()=> import('../views/demoPage/eSignature.vue')
  },
  {
    path:'/rotateImg',
    name:'rotateImg',
    component: ()=> import('../views/demoPage/rotateImg.vue')

  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// 

export default router
