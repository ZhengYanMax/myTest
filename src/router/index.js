import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
import Layout from '../views/Layout'
import Login from '../views/Login'
import Goods from '../views/Goods'
const Center = () => import('../views/Center')
const Advert = () => import('../views/Advert')
const Params = () => import('../views/Params')
Vue.use(VueRouter)

const routes = [{
  path: '',
  name: 'Layout',
  component: Layout,
  meta: {
    isLogin: true
  },
  children: [{
      path: '/',
      name: 'Goods',
      component: Goods
    },
    {
      path: '/center',
      name: 'Center',
      component: Center
    },
    {
      path: '/advert',
      name: 'Advert',
      component: Advert
    },
    {
      path: '/params',
      name: 'Params',
      component: Params
    }

  ]
}, {
  path: '/login',
  name: 'Login',
  component: Login
}]

const router = new VueRouter({
  routes
})
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {undefined
if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
return originalPush.call(this, location).catch(err => err)
}



export default router