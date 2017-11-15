<template>
    <div class="sidebar-container ">
        <div class="logo-con ">
            <img src="../../assets/images/" key="max-logo" class="img-fluid"/>
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
  export default {
    name: 'sidebarMenu',
    props: {
      slotTopClass: String,
      menuList: Array,
      iconSize: Number
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
    updated () {
      this.$nextTick(() => {
        this.$refs.sideMenu.updateOpened()
      })
    }

  }
</script>
