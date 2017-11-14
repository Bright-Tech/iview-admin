<style lang="sass">
    @import "main"
</style>
<template>
    <div class="main-container" :class="{'main-hide-text': hideMenuText}">
        <side-bar></side-bar>
        <div class="body-container">
            <layout-header></layout-header>
            <!--<tab-bar></tab-bar>-->
            <div class="page-container container-fluid mt-3">
                <keep-alive :include="cachePage">
                    <router-view></router-view>
                </keep-alive>
            </div>
        </div>


    </div>
</template>
<script>
  //  import util from '@/libs/util.js'
  import header from '../components/core/header.vue'
  import SideBar from '../components/core/sidebar.vue'
  //  import TabBar from '../components/core/tabbar.vue'

  export default {
    components: {
      'layout-header': header,
      SideBar
//      TabBar
    },
    computed: {
      hideMenuText () {
        return this.$store.state.systemHideMenuText
      },
      cachePage () {
        return this.$store.state.cachePage
      }
    }
  }
</script>
