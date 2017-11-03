// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import store from './store/index'
import VueRouter from 'vue-router'
import {routers} from './router/index'
import iView from 'iview'
import './style/less/app.less'

/**
 * Vue Router
 */

Vue.use(VueRouter)

// 路由配置
const RouterConfig = {
  // mode: 'history',
  routes: routers
}

const router = new VueRouter(RouterConfig)

/**
 * 引入iview组件库
 */
Vue.use(iView)

/**
 * 路由全局钩子
 */
router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()
  store.commit('setTitle', to.meta.title)
  if (to.name !== 'error_404') {
    if (to.path === '/') {
      next({
        name: 'home_index'
      })
    } else if (to.name === 'login') {
      store.commit('setAuthRedirectUrl', from.path)
      next()
    } else {
      store.commit('openNewPage', to)
      store.commit('setBreadCrumbsByRoute', to)
      next()
    }
  } else {
    next()
  }
  iView.LoadingBar.finish()
})

router.afterEach((to, from, next) => {
  window.scrollTo(0, 0)
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  store: store,
  render: h => h(App),
  mounted () {
    // this.$store.dispatch('fetchUser');
    // this.$store.dispatch('fetchUserPermissions');
  }
})
