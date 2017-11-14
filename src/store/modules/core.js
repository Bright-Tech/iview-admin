// initial state
// shape: [{ id, quantity }]
import App from '@/libs/app.js'

const state = {
  currentPageName: '',
  currentPath: [
    {
      title: '首页',
      path: '',
      name: 'home_index'
    }
  ],
  /**
   * 菜单相关
   */
  menuList: [],
  openedMenuNames: [],
  activeName: '',
  /**
   * 面包屑
   */
  breadcrumbItems: [{
    title: '首页',
    path: '',
    name: 'home_index'
  }]
}

// getters
const getters = {}

// actions
const actions = {}

// mutations
const mutations = {
  setCurrentPath (state, pathArr) {
    state.currentPath = pathArr
  },
  /**
   * 菜单相关
   */
  setMenuList (state, menulist) {
    state.menuList = menulist
  },
  updateMenulist (state, appRouter) {
    let menuList = []
    appRouter.forEach((item, index) => {
      if (item.meta && item.meta.showOnMenu) {
        let handledItem = {
          title: item.meta.title,
          icon: item.meta.icon,
          routeName: item.name
        }
        if (item.children) {
          handledItem.children = []
          item.children.forEach((child, childIndex) => {
            if (child.meta && child.meta.showOnMenu) {
              if (child.meta.requiresPermission && !App.hasPermission(child.meta.requiresPermission)) {
              } else {
                handledItem.children.push({
                  title: child.meta.title,
                  icon: child.meta.icon,
                  routeName: child.name
                })
              }
            }
          })
        }
        if (handledItem.children && handledItem.children.length === 0) {
        } else {
          menuList.push(handledItem)
        }
      }
    })
    state.menuList = menuList
  },
  updateOpenedMenu (state, route) {
    let matched = route.matched
    let names = []
    matched.forEach((item, index) => {
      if (item.name !== route.name) {
        names.push(item.name)
      }
    })
    state.activeName = route.name
    state.openedMenuNames = names
  },
  /**
   * 面包屑相关
   */
  updateBreadcrumb (state, route) {
    let matched = route.matched
    let items = [{
      title: '首页',
      routeName: 'home_index'
    }]
    if (route.name !== 'home_index') {
      matched.forEach((item, index) => {
        if (item.name === route.name) {
          items.push({
            title: item.meta.title,
            routeName: item.name,
            active: true
          })
        } else {
          items.push({
            title: item.meta.title,
            routeName: item.name,
            active: false
          })
        }
      })
    }

    state.breadcrumbItems = items
  },
  setPageTitle (state, title) {
    App.setTitle(title)
    state.currentPageName = title
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
