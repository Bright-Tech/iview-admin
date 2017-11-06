<style lang="less">
</style>

<template>
    <Menu ref="sideMenu"
          width="auto" @on-select="changeMenu" theme="dark">
        <template v-for="item in menuList">


            <Submenu v-if="item.children" :name="item.name" :key="item.path">
                <template slot="title">
                    <Icon :type="item.icon" :size="iconSize"></Icon>
                    <span class="layout-text">{{ itemTitle(item) }}</span>
                </template>
                <template v-for="child in item.children">
                    <MenuItem :name="child.name" :key="child.path">
                        <Icon :type="child.meta.icon" :size="iconSize" :key="child.path"></Icon>
                        <span class="layout-text" :key="child.name">{{ itemTitle(child) }}</span>
                    </MenuItem>
                </template>
            </Submenu>

            <MenuItem v-else :name="item.name" :key="item.path">
                <Icon :type="item.meta.icon" :size="iconSize" :key="item.path"></Icon>
                <span class="layout-text" :key="item.path">{{ itemTitle(item) }}</span>
            </MenuItem>
        </template>
    </Menu>
</template>

<script>
//  import util from '@/libs/util'

  export default {
    data () {
      return {
        currentPageName: this.$route.name
//        openedSubmenuArr: this.$store.state.openedSubmenuArr
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
