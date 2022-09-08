


// import MSite from '../pages/home/Msite.vue'
// import Search from '../pages/home/Search'

//路由组件懒加载
// const MSite = () => import('../pages/home/MSite.vue')
// const Search = () => import('../pages/home/Search.vue')



// export default new VueRouter({
    // 所有路由
    // routes: [
export default [
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
            // 将params参数和query参数映射成属性传入路由组件
            props: route => ({keyword3: route.params.keyword, keyword4: route.query.keyword2}),
            meta: {
                showFooter: true
            },
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
            name: 'users',
            /* 只能从主界面, 才能跳转到搜索界面 */
            beforeEnter (to, from, next) {
                if (from.path==='/profile') {
                    next()
                } else {
                    next('/profile')
                }
            }
        },
    ]
// })
