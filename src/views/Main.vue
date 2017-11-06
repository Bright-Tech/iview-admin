<style lang="sass">
    @import "main"
</style>
<template>
    <div class="main-container" :class="{'main-hide-text': hideMenuText}">
        <side-bar></side-bar>
        <div class="body-container">
            <layout-header></layout-header>
            <tab-bar></tab-bar>
            <!--<div class="tags-con">-->
            <!--<tags-page-opened :pageTagsList="pageTagsList"></tags-page-opened>-->
            <!--</div>-->
            <div class="page-container container-fluid">
                <keep-alive :include="cachePage">
                    <router-view></router-view>
                </keep-alive>
            </div>
        </div>


    </div>
</template>
<script>
  import util from '@/libs/util.js'
  import header from '../components/core/header.vue'
  import SideBar from '../components/core/sidebar.vue'
  import TabBar from '../components/core/tabbar.vue'
  import Cookies from 'js-cookie'

  export default {
    components: {
      'layout-header': header,
      SideBar,
      TabBar
    },
    data () {
      return {
        spanLeft: 4,
        spanRight: 20,
        currentPageName: '',
        hideMenuText: false,
        userName: '',
        messageCount: 0,
        lockScreenSize: 0
      }
    },
    computed: {
      tagsList () {
        return this.$store.state.tagsList  // 所有页面的页面对象
      },
      pageTagsList () {
        return this.$store.state.pageOpenedList  // 打开的页面的页面对象
      },
      currentPath () {
        return this.$store.state.currentPath  // 当前面包屑数组
      },
      menuIconColor () {
        return this.$store.state.menuTheme === 'dark' ? 'white' : '#495060'
      },
      cachePage () {
        return this.$store.state.cachePage
      }
    },
    methods: {
      init () {
        this.$store.commit('setCurrentPageName', this.$route.name)
//        let pathArr = util.setCurrentPath(this, this.$route.name)
//        if (pathArr.length >= 2) {
//          this.$store.commit('addOpenSubmenu', pathArr[1].name)
//        }
        this.userName = Cookies.get('user')
//        let messageCount = 3
//        this.messageCount = messageCount.toString()
//        this.checkTag(this.$route.name)
      },
      showMessage () {
        util.openNewPage(this, 'message_index')
        this.$router.push({
          name: 'message_index'
        })
      },

      checkTag (name) {
        let openpageHasTag = this.pageTagsList.some(item => {
          if (item.name === name) {
            return true
          }
        })
        if (!openpageHasTag) {  //  解决关闭当前标签后再点击回退按钮会退到当前页时没有标签的问题
          util.openNewPage(this, name, this.$route.params || {}, this.$route.query || {})
        }
      }
    },
    watch: {
      '$route' (to) {
//        this.$store.commit('setCurrentPageName', to.name)
//        let pathArr = util.setCurrentPath(this, to.name)
//        if (pathArr.length > 2) {
//          this.$store.commit('addOpenSubmenu', pathArr[1].name)
//        }
//        this.checkTag(to.name)
      }

    },
    mounted () {
      this.init()
    },
    created () {
      console.log('Main.vue')
      // 显示打开的页面的列表
//      this.$store.commit('setOpenedList')
    }
  }
</script>
