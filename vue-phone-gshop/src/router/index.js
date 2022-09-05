/*
路由器对象模块
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
// 声明使用插件
Vue.use(VueRouter)


// import MSite from '../pages/home/Msite.vue'
// import Search from '../pages/home/Search'

//路由组件懒加载
// const MSite = () => import('../pages/home/MSite.vue')
// const Search = () => import('../pages/home/Search.vue')



export default new VueRouter({
  // 所有路由
  routes: [
    {
      path: '/msite',
      component: () => import('@/pages/home/Msite'), //路由组件懒加载
      meta: {
        showFooter: true
      }
    },
    {
      path: '/search',
      component: () => import('@/pages/home/Search'),
      meta: {
        showFooter: true
      }
    },
    {
      path: '/order',
      component: () => import('@/pages/home/Order'),
      meta: {
        showFooter: true
      }
    },
    {
      path: '/profile',
      component: () => import('@/pages/home/Profile'),
      meta: {
        showFooter: true
      }
    },
    {
      path: '/',
      redirect: '/msite'
    },
    {
      path: '/login',
      component: () => import('@/pages/login/Login')
    },
    {
      path: '/shop',
      component: () => import('@/pages/shop/Shop'),
      children: [
        {
          path: '/shop/goods',
          component: () => import('@/pages/shop/ShopGoods')
        },
        {
          path: '/shop/ratings',
          component: () => import('@/pages/shop/ShopRatings')
        },
        {
          path: '/shop/info',
          component: () => import('@/pages/shop/ShopInfo')
        },
        {
          path: '',
          redirect: '/shop/goods'
        },
      ]
    },
    {
      path: '/userinfo',
      component: () => import('@/pages/user/User'),
      name: 'users'
    },
  ]
})
