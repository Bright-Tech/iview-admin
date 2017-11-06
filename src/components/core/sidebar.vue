<template>
    <div class="sidebar-container ">
        <div class="logo-con">
            <img v-show="!hideMenuText" src="../../assets/images/logo.jpg" key="max-logo" class="img-fluid"/>
            <img v-show="hideMenuText" src="../../assets/images/logo-min.jpg" key="min-logo"/>
        </div>
        <sidebar-menu v-if="!hideMenuText" :menuList="menuList" :iconSize="14"/>
        <sidebar-menu-shrink :icon-color="menuIconColor" v-else :menuList="menuList"/>
    </div>
</template>

<script>
  import sidebarMenu from '../../views/main_components/sidebarMenu.vue'
  import sidebarMenuShrink from '../../views/main_components/sidebarMenuShrink.vue'
  //  import breadcrumbNav from '../main_components/breadcrumbNav.vue'
  //  import util from '@/libs/util.js'
  //  import Cookies from 'js-cookie'

  export default {
    name: 'Sidebar',
    components: {
      sidebarMenu,
      sidebarMenuShrink
    },
    computed: {
      menuList () {
        return this.$store.state.core.menuList
      },
      currentPath () {
        return this.$store.state.currentPath  // 当前面包屑数组
      },
      hideMenuText () {
        return this.$store.state.systemHideMenuText
      },
      avatorPath () {
        return localStorage.avatorImgPath
      }
    }

  }
</script>

<style lang="sass">
    @import "sidebar"
</style>