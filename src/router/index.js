import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from 'components/Home'
import Login from 'components/Login'
import Layout from 'components/Layout'
import New from 'components/New'
import Edit from 'components/Edit'
import Preview from 'components/Preview'
import UserApi from 'api/User'

Vue.use(VueRouter)
const routes = [
  {
    path: '/home',
    component: Layout,
    children: [
      {
        path: '/',
        component: Home,
        name: 'Home',
        meta: { notKeepAlive: false }
      },
      {
        path: '/new',
        component: New,
        meta: { notKeepAlive: true }
      },
      {
        name: 'Edit',
        path: '/edit/:id',
        component: Edit,
        meta: { notKeepAlive: true }
      },
      {
        name: 'Preview',
        path: '/preview/:id',
        component: Preview,
        meta: { notKeepAlive: true }
      }
    ]
  },
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta: { notKeepAlive: false }
  }
]
const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  if (to.name === 'Login') {
    if (!UserApi.getUser()) {
      next()
    } else {
      next({name: 'Home'})
    }
  } else {
    if (!UserApi.getUser()) {
      next({name: 'Login'})
    } else {
      next()
    }
  }
})
export default router
