<template>
    <div class="sidebar-container ">
        <div class="logo-container d-flex align-items-center">
            <img src="../../assets/images/logo.png" key="max-logo" class="m-auto"/>
        </div>
        <Menu ref="sideMenu" accordion
              width="auto" @on-select="changeMenu" theme="dark" :openNames="openedMenuNames" :activeName="activeName">
            <template v-for="item in menuList">
                <Submenu v-if="item.children" :name="item.routeName">
                    <template slot="title">
                        <Icon :type="item.icon" :size="iconSize"></Icon>
                        <span class="layout-text">{{ item.title }}</span>
                    </template>
                    <template v-for="child in item.children">
                        <MenuItem :name="child.routeName">
                            <Icon :type="child.icon" :size="iconSize" :key="child.path"></Icon>
                            <span class="layout-text" :key="child.name">{{ child.title }}</span>
                        </MenuItem>
                    </template>
                </Submenu>

                <MenuItem v-else :name="item.routeName">
                    <Icon :type="item.icon" :size="iconSize" :key="item.path"></Icon>
                    <span class="layout-text" :key="item.path">{{ item.title }}</span>
                </MenuItem>
            </template>
        </Menu>
    </div>
</template>

<script>
  //  import sidebarMenu from './components/sidebarMenu.vue'
  //  import sidebarMenuShrink from './components/sidebarMenuShrink.vue'
  //  import breadcrumbNav from '../main_components/breadcrumbNav.vue'
  //  import util from '@/libs/util.js'
  //  import Cookies from 'js-cookie'

  export default {
    name: 'Sidebar',
    data () {
      return {
        iconSize: 14
      }
    },
    components: {
//      sidebarMenu,
//      sidebarMenuShrink
    },
    computed: {
      openedMenuNames () {
        let names = []
        this.$store.state.core.openedMenuNames.forEach((item) => {
          names.push(item)
        })
        return names
      },
      activeName () {
        return this.$store.state.core.activeName
      },
      menuList () {
        return this.$store.state.core.menuList
      }
//      currentPath () {
//        return this.$store.state.currentPath  // 当前面包屑数组
//      },
//      hideMenuText () {
//        return this.$store.state.systemHideMenuText
//      },
//      avatorPath () {
//        return localStorage.avatorImgPath
//      }
    },
    methods: {
      changeMenu (active) {
        if (active !== 'accesstest_index') {
//          util.openNewPage(this, active)
          this.$router.push({
            name: active
          })
        }
      },
      itemTitle (item) {
        return item.meta.title
      }
    },
    updated () {
      this.$nextTick(() => {
        this.$refs.sideMenu.updateOpened()
      })
    }

  }
</script>

<style lang="sass">
    @import "sidebar"
</style>