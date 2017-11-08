<style lang="less">
</style>

<template>
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
</template>

<script>
  //  import util from '@/libs/util'

  export default {
    data () {
      return {
        currentPageName: this.$route.name,
        activeName: this.$store.state.core.activeName
      }
    },
    name: 'sidebarMenu',
    props: {
      slotTopClass: String,
      menuList: Array,
      iconSize: Number
    },
    computed: {
      tagsList () {
        return this.$store.state.tagsList
      },
      openedMenuNames () {
        let names = []
        this.$store.state.core.openedMenuNames.forEach((item) => {
          names.push(item)
        })
        console.log(names)
        return names
      }
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
    watch: {
      '$route' (to) {
//        this.currentPageName = to.name
//        localStorage.currentPageName = to.name
      },
      currentPageName () {
        this.openedSubmenuArr = this.$store.state.openedSubmenuArr
        this.$nextTick(() => {
          this.$refs.sideMenu.updateOpened()
        })
      }
    },
    updated () {
      this.$nextTick(() => {
        this.$refs.sideMenu.updateOpened()
      })
    }

  }
</script>
