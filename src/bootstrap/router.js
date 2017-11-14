/**
 * 路由初始化
 *
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import { routerConfig } from '../router'
import iView from 'iview'
import store from '@/store'
import App from '@/libs/app.js'

// 路由配置
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: routerConfig
})

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()

  if (to.matched.some(record => record.meta && record.meta.requiresAuth)) { // 判断目标路由是否需要登录
    if (!App.user()) {
      next({
        name: 'login',
        query: {redirect: to.fullPath}
      })
    } else {
      if (to.meta.requiresPermission) {
        if (App.hasPermission(to.meta.requiresPermission)) {
          next()
        } else {
          next(new Error('403'))
        }
      } else {
        next()
      }
    }
  } else {
    next()
  }

  iView.LoadingBar.finish()
})

router.afterEach((to, from) => {
  store.commit('setPageTitle', to.meta.title)
  store.commit('updateOpenedMenu', to)
  store.commit('updateBreadcrumb', to)
  iView.LoadingBar.finish()
  window.scrollTo(0, 0)
})

router.onError((error) => {
  switch (error.message) {
    case '404':
      router.push({name: '404'})
      break
    case '403':
      router.push({name: '403'})
      break
  }
  console.log(error)
})

export default router
