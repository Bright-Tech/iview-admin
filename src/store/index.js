import Vue from 'vue'
import Vuex from 'vuex'
import { otherRouter, appRouter } from '../router'
import core from './modules/core'
// import Cookies from 'js-cookie'
// import Util from '@/libs/util.js'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state: {
    systemHideMenuText: false,
    routers: [
      otherRouter,
      ...appRouter
    ],
    menuList: [],
    tagsList: [...otherRouter.children],
    pageOpenedList: [{
      title: '首页',
      path: '',
      name: 'home_index'
    }],
    currentPageName: '',
    currentPath: [
      {
        title: '首页',
        path: '',
        name: 'home_index'
      }
    ],  // 面包屑数组
    openedSubmenuArr: [],  // 要展开的菜单数组
    menuTheme: '', // 主题
    theme: '',
    cachePage: [],
    lang: '',
    isFullScreen: false
  },
  getters: {},
  mutations: {
    toggleMenuTextVisible (state) {
      state.hideMenuText = !state.hideMenuText
    },
    setOpenedList (state) {
      state.pageOpenedList = localStorage.pageOpenedList ? JSON.parse(localStorage.pageOpenedList) : [otherRouter.children[0]]
    },
    setCurrentPath (state, pathArr) {
      state.currentPath = pathArr
    },
    setCurrentPageName (state, name) {
      state.currentPageName = name
    },
    addOpenSubmenu (state, name) {
      let hasThisName = false
      let isEmpty = false
      if (name.length === 0) {
        isEmpty = true
      }
      if (state.openedSubmenuArr.indexOf(name) > -1) {
        hasThisName = true
      }
      if (!hasThisName && !isEmpty) {
        state.openedSubmenuArr.push(name)
      }
    },
    setMenuList (state, menulist) {
      state.menuList = menulist
    }
  },
  actions: {},
  modules: {core},

  strict: debug
  // plugins: debug ? [createLogger()] : []
})
