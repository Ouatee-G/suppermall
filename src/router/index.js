import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Home = () => import('views/home/Home')
const Cart = () => import('views/cart/Cart')
const Category = () => import('views/category/Category')
const Porfile = () => import('views/porfile/Porfile')

const routes = [
  {
    path:'',
    redirect: '/home'
  },
  {
    path:'/home',
    component: Home
  },
  {
    path:'/cart',
    component: Cart
  },
  {
    path:'/category',
    component: Category
  },
  {
    path:'/porfile',
    component: Porfile
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
