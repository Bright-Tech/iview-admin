// initial state
// shape: [{ id, quantity }]
const state = {

  menuList: [],
  currentPageName: '',
  currentPath: [
    {
      title: '首页',
      path: '',
      name: 'home_index'
    }
  ]  // 面包屑数组
}

// getters
const getters = {}

// actions
const actions = {}

// mutations
const mutations = {
  setMenuList (state, menulist) {
    state.menuList = menulist
  },
  updateMenulist (state, appRouter) {
    let menuList = []
    appRouter.forEach((item, index) => {
      if (item.meta && item.meta.showOnMenu) {
        if (item.children) {
          let childrenArr = item.children.filter(child => child.meta && child.meta.showOnMenu)
          let handledItem = JSON.parse(JSON.stringify(item))
          handledItem.children = childrenArr
          menuList.push(handledItem)
        } else {
          menuList.push(item)
        }
      }
    })
    console.log(menuList)
    state.menuList = menuList
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
