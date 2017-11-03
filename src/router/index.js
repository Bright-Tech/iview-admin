import Main from '../views/layout/main.vue'

/*
 导航和标签基于name匹配，面包屑基于path匹配；
 所有附加属性均写在meta属性中（包括权限）；
 为每个路由配置title属性；
 为缓存的页面配置面包屑；
 为导航页面配置icon；
 */

/**
 * 登录路由
 * @type {{path: string, name: string, meta: {title: string}, component: ((p1?:*))}}
 */
export const loginRouter = {
  path: '/login',
  name: 'login',
  meta: {
    title: '登录'
  },
  component: resolve => require(['../views/login.vue'], resolve)
}

/**
 * 404
 * @type {{path: string, name: string, meta: {title: string}, component: ((p1?:*)=>*)}}
 */
export const page404 = {
  path: '/*',
  name: 'error_404',
  meta: {
    title: '404-页面不存在'
  },
  component: resolve => require(['../views/errors/error_404.vue'], resolve)
}

/**
 * 加载main组件，但是不显示在左侧导航栏中写在这
 * @type {{path: string, name: string, component: {components, data, computed, methods}, meta: {requiresAuth: boolean}, children: [*]}}
 */
export const otherRouter = {
  path: '/',
  name: 'otherRouter',
  component: Main,
  meta: { requiresAuth: true },
  children: [
    {
      path: 'user-detail/:userId',
      name: 'user_detail',
      meta: {
        title: '用户详情'
      },
      component: resolve => require(['../views/user/userDetail.vue'], resolve)
    }
  ]
}

/**
 * 加载main组件，并且显示在左侧导航栏中的路由写在这
 * @type {[*]}
 */
export const appRouter = [
  {
    path: '/home',
    name: 'home',
    component: Main,
    meta: {
      requiresAuth: true,
      icon: 'ios-speedometer',
      title: '首页'
    },
    children: [
      {
        path: 'index',
        name: 'home_index',
        meta: {
          icon: 'ios-speedometer',
          title: '首页'
        },
        component: resolve => require(['../views/dashboard.vue'], resolve)
      }
    ]
  },

  {
    path: '/user',
    name: 'user',
    component: Main,
    meta: {
      requiresAuth: true,
      title: '前台用户管理',
      icon: 'ios-people'
    },
    children: [
      {
        path: 'index',
        name: 'user_index',
        meta: {
          icon: 'ios-body',
          title: '用户管理',
          breadCrumbs: [{'name': '用户列表', 'href': '/user/index', 'active': true}]
        },
        component: resolve => require(['../views/user/index.vue'], resolve)
      },
      {
        path: 'teacher',
        name: 'user_teacher',
        meta: {
          icon: 'person',
          title: '教师管理',
          breadCrumbs: [{'name': '教师列表', 'href': '/user/teacher', 'active': true}]
        }
      },
      {
        path: 'company',
        name: 'user_company',
        meta: {
          icon: 'person-stalker',
          title: '社会人士管理',
          breadCrumbs: [{'name': '社会用户列表', 'href': '/user/company', 'active': true}]
        }
      }
    ]
  }
]

export const routers = [
  loginRouter,
  otherRouter,
  ...appRouter,
  page404
]
