import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from 'components/Home'
import Splash from 'components/SplashScreen'
import Layout from 'components/Layout'

Vue.use(VueRouter)
const routes = [
  {
    path: '/home',
    component: Layout,
    children: [
      {
        path: '/',
        component: Home,
        meta: { notKeepAlive: false }
      }
    ]
  },
  {
    path: '/',
    component: Splash,
    meta: { notKeepAlive: false }
  }
]
const router = new VueRouter({
  routes
})
export default router
