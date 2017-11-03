/**
 * Created by 都大爽 on 2017/8/7.
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state: {

    /**
     * 显示的标签列表
     */
    pageOpenedList: [
      {
        path: '/home/index',
        name: 'home_index',
        title: '首页'
      }
    ],

    /**
     * 页面标题
     */
    title: '',

    /**
     * 登录后跳转地址
     */
    authRedirectUrl: '/',

    /**
     * 用户信息
     */
    user: {
      name: 'admin',
      email: 'dashuang@example.com',
      mobile: '13212341234',
      permissions: ['create-edit-data'], // 权限列表
      can: function (permission) {
        return this.permissions.findIndex(item => item === permission) > -1
      }
    },

    /**
     * 面包屑
     */
    breadCrumbs: []
  },

  mutations: {

    /**
     * 添加一个新的标签页
     * @param state
     * @param route
     */
    openNewPage (state, route) {
      if (state.pageOpenedList.findIndex(item => item.name === route.name) === -1) {
        state.pageOpenedList.push({
          path: route.path,
          name: route.name,
          title: route.meta.title,
          params: route.params,
          query: route.query
        })
      }
    },

    /**
     * 移除一个标签页
     * @param state
     * @param name
     */
    removeTag (state, name) {
      state.pageOpenedList.map((item, index) => {
        if (item.name === name) {
          state.pageOpenedList.splice(index, 1)
        }
      })
    },

    /**
     * 清空所有标签页
     * @param state
     */
    clearAllTags (state) {
      state.pageOpenedList.splice(1)
    },

    /**
     * 清空其他标签页
     * @param state
     * @param name
     */
    clearOtherTags (state, name) {
      if (name === 'home_index') {
        state.pageOpenedList.splice(1)
      } else {
        let currentTag = state.pageOpenedList.find(item => item.name === name)
        state.pageOpenedList = [
          {
            path: '/home/index',
            name: 'home_index',
            title: '首页'
          },
          currentTag
        ]
      }
    },

    /**
     * 变更标题
     * @param state
     * @param title
     */
    setTitle (state, title) {
      state.title = title
      document.title = 'Bright-' + state.title
    },

    /**
     * 设置登录后重定向地址
     * @param state
     * @param authRedirectUrl
     */
    setAuthRedirectUrl (state, authRedirectUrl) {
      state.authRedirectUrl = authRedirectUrl
    },

    /**
     * 设置当前用户
     * @param state
     * @param user
     */
    setUser (state, user) {
      debug && console.log(user)
      state.user.name = user.name
      state.user.email = user.email
      state.user.mobile = user.mobile
    },

    /**
     * 设置当前用户权限
     * @param state
     * @param permissions
     */
    setUserPermissions (state, permissions) {
      debug && console.log(permissions)
      state.user.permissions = permissions
    },

    /**
     * 设置面包屑
     * @param state
     * @param breadCrumbs
     */
    setBreadCrumbs (state, breadCrumbs) {
      debug && console.log(breadCrumbs)
      state.breadCrumbs = breadCrumbs
    },

    /**
     * 根据路由设置面包屑
     * @param state
     * @param route
     */
    setBreadCrumbsByRoute (state, route) {
      if (route.meta.breadCrumbs) {
        state.breadCrumbs = route.meta.breadCrumbs
      }
    }
  },

  actions: {

    /**
     * 获取当前用户
     * @param commit
     */
    // fetchUser({commit}){
    //   axios.get('api/admin/profile').then(function (response) {
    //     debug && console.log('Susscee:', response);
    //     commit('setUser', response.data);
    //   }).catch(function (error) {
    //     // Something happened in setting up the request that triggered an Error
    //     debug && console.log('Error', error.message);
    //   });
    // },
    //
    // /**
    //  * 获取用户权限
    //  * @param commit
    //  */
    // fetchUserPermissions({commit}){
    //   axios.get('api/admin/permission').then(function (response) {
    //     debug && console.log('Susscee:', response);
    //     commit('setUserPermissions', response.data);
    //   }).catch(function (error) {
    //     // Something happened in setting up the request that triggered an Error
    //     debug && console.log('Error', error.message);
    //   });
    // }
  },
  modules: {
    // member
  },

  strict: debug
  // plugins: debug ? [createLogger()] : []
})
