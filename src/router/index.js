import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('views/home/Home')
const Category = () => import('views/category/Category')
const Cart = () => import('views/cart/Cart')
const Profile = () => import('views/profile/Profile')
const Detail = () => import('views/detail/Detail')

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
    meta: {
      keepAlive: true // 是否缓存组件
  }
  },
  {
    path: '/category',
    component: Category,
    meta: {
      keepAlive: true // 是否缓存组件
  }
  },
  {
    path: '/cart',
    component: Cart,
    meta: {
      keepAlive: true // 是否缓存组件
  }
  },
  {
    path: '/profile',
    component: Profile,
    meta: {
      keepAlive: true // 是否缓存组件
  }
  },
  {
    path: '/detail/:iid',
    component: Detail,
    meta: {
      keepAlive: false// 是否缓存组件
  }
  }
]
const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router