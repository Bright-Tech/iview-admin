<template>
    <nav class="navbar main-header-container border-shadow-bottom">
        <Button class="navbar-toggler pl-0" :style="{transform: 'rotateZ(' + (this.hideMenuText ? '-90' : '0') + 'deg)'}" type="text"
                @click="toggleClick">
            <Icon type="navicon" size="32"></Icon>
        </Button>
        <ul class="navbar-nav flex-row-reverse align-items-center">
            <li class="nav-item ml-2">
                <Dropdown trigger="click" @on-click="handleClickUserDropdown">
                    <a href="javascript:void(0)">
                        <span class="main-user-name">{{ userName }}</span>
                        <Icon type="arrow-down-b"></Icon>
                    </a>
                    <DropdownMenu slot="list">
                        <DropdownItem name="ownSpace">个人中心</DropdownItem>
                        <DropdownItem name="loginout" divided>退出登录</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <Avatar :src="avatorPath" style="line-height: inherit; margin-left: 10px;"></Avatar>
            </li>
            <li class="nav-item mx-2">
                <Tooltip :content="messageCount > 0 ? '有' + messageCount + '条未读消息' : '无未读消息'"
                         placement="bottom">
                    <Badge :count="messageCount" dot>
                        <Icon type="email" :size="22"></Icon>
                    </Badge>
                </Tooltip>
            </li>
            <li class="nav-item mx-2">
                <Tooltip :content="messageCount > 0 ? '有' + messageCount + '条未读消息' : '无未读消息'"
                         placement="bottom">
                    <Badge :count="messageCount" dot>
                        <Icon type="ios-bell" :size="22"></Icon>
                    </Badge>
                </Tooltip>
            </li>
        </ul>
    </nav>
</template>

<script>
  import breadcrumbNav from '../../views/main_components/breadcrumbNav.vue'
  import util from '@/libs/util.js'
  import Cookies from 'js-cookie'

  export default {
    name: 'LayoutHeader',
    components: {
      breadcrumbNav
    },
    data () {
      return {
        userName: '',
        messageCount: 0
      }
    },
    computed: {
      currentPath () {
        return this.$store.state.currentPath  // 当前面包屑数组
      },
      hideMenuText () {
        return this.$store.state.systemHideMenuText
      },
      avatorPath () {
        return localStorage.avatorImgPath
      }
    },
    methods: {
      toggleClick () {
        this.$store.commit('toggleMenuTextVisible')
      },
      showMessage () {
        util.openNewPage(this, 'message_index')
        this.$router.push({
          name: 'message_index'
        })
      },
      handleClickUserDropdown (name) {
        if (name === 'ownSpace') {
          util.openNewPage(this, 'ownspace_index')
          this.$router.push({
            name: 'ownspace_index'
          })
        } else if (name === 'loginout') {
          // 退出登录
          Cookies.remove('user')
          Cookies.remove('password')
          Cookies.remove('hasGreet')
          Cookies.remove('access')
          this.$Notice.close('greeting')
          this.$store.commit('clearOpenedSubmenu')
          // 回复默认样式
          let themeLink = document.querySelector('link[name="theme"]')
          themeLink.setAttribute('href', '')
          // 清空打开的页面等数据，但是保存主题数据
          let theme = ''
          if (localStorage.theme) {
            theme = localStorage.theme
          }
          localStorage.clear()
          if (theme) {
            localStorage.theme = theme
          }
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