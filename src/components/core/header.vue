<template>
    <nav class="navbar main-header-container align-items-center">
        <Button class="navbar-toggler pl-0"
                :style="{transform: 'rotateZ(' + (this.hideMenuText ? '-90' : '0') + 'deg)'}" type="text"
                @click="toggleClick">
            <Icon type="navicon" size="32"></Icon>
        </Button>
        <ul class="navbar-nav">
            <li>
                <bs4-breadcrumb :items="breadcrumbItems"></bs4-breadcrumb>
            </li>
        </ul>
        <ul class="navbar-nav flex-row align-items-center ml-md-auto">

            <li class="nav-item ml-2 d-flex align-items-center">
                <Dropdown trigger="click" @on-click="handleClickUserDropdown">
                    <a href="javascript:void(0)">
                        <span class="main-user-name">{{ user.name }}</span>
                        <Icon type="arrow-down-b"></Icon>
                    </a>
                    <DropdownMenu slot="list">
                        <DropdownItem name="ownSpace">个人中心</DropdownItem>
                        <DropdownItem name="loginout" divided>退出登录</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <Avatar :src="user.avator" style="line-height: inherit; margin-left: 10px;"></Avatar>
            </li>
        </ul>
    </nav>
</template>

<script>
  import Bs4Breadcrumb from '../bootstrap4/breadcrumb.vue'
  import util from '@/libs/util.js'
  import App from '@/libs/app.js'

  export default {
    name: 'LayoutHeader',
    components: {
      Bs4Breadcrumb
    },
    data () {
      return {
        messageCount: 0
      }
    },
    computed: {
      hideMenuText () {
        return this.$store.state.systemHideMenuText
      },
      breadcrumbItems () {
        return this.$store.state.core.breadcrumbItems
      },
      user () {
        console.log(App.user())
        return App.user()
      }
    },
    methods: {
      toggleClick () {
        this.$store.commit('toggleMenuTextVisible')
      },
      handleClickUserDropdown (name) {
        if (name === 'ownSpace') {
          util.openNewPage(this, 'ownspace_index')
          this.$router.push({
            name: 'ownspace_index'
          })
        } else if (name === 'loginout') {
          // 退出登录
          App.logout()
          this.$Notice.close('greeting')
//          this.$store.commit('clearOpenedSubmenu')
          // 清空打开的页面等数据，但是保存主题数据
          localStorage.clear()
          this.$router.push({
            name: 'login'
          })
        }
      }
    }
  }
</script>

<style lang="scss">
    @import "header";
</style>