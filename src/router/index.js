/**
 *  路由配置页
 *  路由定义中的meta属性中 增加了几s个特殊属性
 *
 *  showOnMenu              该选项是否显示在边栏菜单中
 *  icon                    在边栏菜单中显示时的图标
 *  title                   在边栏菜单中显示时的名称
 *  requiresAuth            该路由是否需要登录才能访问
 */

import Main from '../views/Main.vue'
import App from '@/libs/app.js'

export const loginRouter = {
  path: '/login',
  name: 'login',
  meta: {
    title: 'Login - 登录'
  },
  component: resolve => { require(['../views/login.vue'], resolve) },
  beforeEach: (to, from, next) => {
    if (App.auth()) {  // 判断是否已经登录
      next({
        name: 'home_index'
      })
    }
  }
}

export const appRouter = [
  {
    path: '/access',
    name: 'access',
    component: Main,
    meta: {
      showOnMenu: true,
      icon: 'key',
      title: '权限管理'
    },
    children: [
      {
        path: 'index',
        name: 'access_index',
        component: resolve => { require(['../views/access/access.vue'], resolve) },
        meta: {
          showOnMenu: true,
          icon: 'key',
          title: '权限管理'
        }
      }
    ]
  },
  {
    path: '/menu1',
    name: 'menu1',
    component: Main,
    meta: {
      showOnMenu: true,
      icon: 'key',
      title: '菜单1'
    },
    children: [
      {
        path: 'menu1-1',
        name: 'menu1_1',
        component: resolve => { require(['../views/access/access.vue'], resolve) },
        meta: {
          showOnMenu: true,
          icon: 'key',
          title: '菜单1-1'
        }
      }
    ]
  },
  {
    path: '/menu2',
    name: 'menu2',
    component: Main,
    meta: {
      showOnMenu: true,
      icon: 'key',
      title: '菜单2'
    },
    children: [
      {
        path: 'menu2-1',
        name: 'menu2-1',
        component: resolve => { require(['../views/access/access.vue'], resolve) },
        meta: {
          showOnMenu: true,
          icon: 'key',
          title: '菜单2-1'
        }
      },
      {
        path: 'menu2-2',
        name: 'menu2-2',
        component: resolve => { require(['../views/access/access.vue'], resolve) },
        meta: {
          showOnMenu: true,
          icon: 'key',
          title: '菜单2-2'
        }
      }
    ]
  }
]

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
  path: '/',
  name: 'otherRouter',
  component: Main,
  children: [
    {
      path: 'home',
      title: '首页',
      name: 'home_index',
      component: resolve => { require(['../views/home/home.vue'], resolve) }
    }
    // { path: 'ownspace', title: '个人中心', name: 'ownspace_index', component: resolve => { require(['./views/own-space/own-space.vue'], resolve); } },
    // { path: 'order/:order_id', title: '订单详情', name: 'order_info', component: resolve => { require(['./views/advanced-router/component/order-info.vue'], resolve); } },  // 用于展示动态路由
    // { path: 'shopping', title: '购物详情', name: 'shopping', component: resolve => { require(['./views/advanced-router/component/shopping-info.vue'], resolve); } },  // 用于展示带参路由
    // { path: 'message', title: '消息中心', name: 'message_index', component: resolve => { require(['./views/message/message.vue'], resolve); } }
  ]
}

export const routerConfig = [
  loginRouter,
  ...appRouter,
  otherRouter
]

export default routerConfig
