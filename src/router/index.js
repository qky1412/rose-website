import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from 'components/Home'
import Splash from 'components/SplashScreen'
import Layout from 'components/Layout'
import New from 'components/New'

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
      },
      {
        path: '/new',
        component: New,
        meta: { notKeepAlive: true }
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
