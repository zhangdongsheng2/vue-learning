/*
路由对象模块
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../pages/home/Home'
import News from '../pages/home/News'
import Message from '../pages/home/Message'
import MessageDetail from '../pages/home/MessageDetail'
import About from '../pages/About'
import Hello from '../pages/Hello'
import Todos1 from '../pages/Todos1Props'
import Todos2 from '../pages/Todos2PubSub'
import Todos3 from '../pages/Todos3Slot'
import Users from '../pages/Users'
import Heatmap from '../pages/Heatmap'

/*
声明使用vue-router插件

内部定义并注册了2个组标签 (router-link / router-view)
给组件对象添加了两个属性:
1. $router : 路由器
2. $route : 当前路由
 */

Vue.use(VueRouter)

export default new VueRouter(
  {
    routes: [
      {
        path: '/home',
        component: Home,
        name: '首页',
        children: [
          {
            path: '/home/news',
            component: News,
          },
          {
            path: 'message',
            component: Message,
            children: [
              {
                path: 'detail/:id',
                component: MessageDetail
              }
            ]
          }
        ]
      },
      {
        path: '/about',
        component: About,
        name: '关于'
      },
      {
        path: '/hello',
        component: Hello,
        name: 'Hello'
      },
      {
        path: '/todos1_props',
        component: Todos1,
        name: 'Todos1'
      },
      {
        path: '/todos2_pubsub',
        component: Todos2,
        name: 'Todos2'
      },
      {
        path: '/todos3_slot',
        component: Todos3,
        name: 'Todos3'
      },
      {
        path: '/users',
        component: Users,
        name: 'users'
      },
      {
        path: '/heatmap',
        component: Heatmap,
        name: 'heatmap'
      },
      {
        path: '/',
        redirect: '/home'
      }
    ]
  }
)











