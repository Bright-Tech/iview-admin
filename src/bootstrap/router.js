import Vue from 'vue'
import VueRouter from 'vue-router'
import { routerConfig } from '../router'
import Cookies from 'js-cookie'
import iView from 'iview'
import Util from '../libs/util'

// 路由配置
Vue.use(VueRouter)

const router = new VueRouter({
  routes: routerConfig
})

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()
  Util.title(to.meta.title)
  if (!Cookies.get('user') && to.name !== 'login') {  // 判断是否已经登录且前往的页面不是登录页
    next({
      name: 'login'
    })
  } else if (Cookies.get('user') && to.name === 'login') {  // 判断是否已经登录且前往的是登录页
    Util.title()
    next({
      name: 'home_index'
    })
  } else {
    next()
  }

  iView.LoadingBar.finish()
})

router.afterEach(() => {
  iView.LoadingBar.finish()
  window.scrollTo(0, 0)
})

export default router
