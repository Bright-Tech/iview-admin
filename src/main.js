// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './bootstrap/router'
import store from './store'
import './bootstrap/iview'
import routerConfig from './router/index'

Vue.config.productionTip = false
console.log(routerConfig)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App},
  mounted () {
    this.currentPageName = this.$route.name
    // this.$store.commit('initCachepage');
    // 权限菜单过滤相关
    this.$store.commit('updateMenulist', routerConfig)
  }
})
