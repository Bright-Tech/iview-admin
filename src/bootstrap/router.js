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
  routes: routerConfig
})

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()
  App.setTitle(to.meta.title)

  if (to.matched.some(record => record.meta && record.meta.requiresAuth)) { // 判断目标路由是否需要登录
    if (!App.auth()) {
      next({
        name: 'login',
        query: {redirect: to.fullPath}
      })
    } else {
      next()
    }
  } else {
    next()
  }

  iView.LoadingBar.finish()
})

router.afterEach((to, from) => {
  store.commit('updateOpenedMenu', to)
  store.commit('updateBreadcrumb', to)
  iView.LoadingBar.finish()
  window.scrollTo(0, 0)
})

export default router
