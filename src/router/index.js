import Main from '../views/Main.vue'

export const loginRouter = {
  path: '/login',
  name: 'login',
  meta: {
    title: 'Login - 登录'
  },
  component: resolve => { require(['../views/login.vue'], resolve) }
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
