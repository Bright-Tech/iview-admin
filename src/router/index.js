import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export const loginRouter = {
  path: '/login',
  name: 'login',
  meta: {
    title: 'Login - 登录'
  },
  component: resolve => { require(['../views/login.vue'], resolve) }
}

export default new Router({
  routes: [
    loginRouter,
    {
      path: '/',
      name: 'Hello',
      component: HelloWorld
    }
  ]
})
