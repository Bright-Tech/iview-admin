<template>
    <div class="access">

        <div class="row">
            <div class="col-4 pr-0">
                <bs4-card>
                    <div slot="header">
                    <Icon type="android-contact"></Icon>
                    当前用户
                </div>
                    <div class="access-user-con access-current-user-con">
                        <img :src="avatorPath" alt="">
                        <p>当前用户权限值:<b>{{ accessCode }}</b></p>
                    </div>
                </bs4-card>
            </div>
            <div class="col-8">
                <bs4-card>
                    <div slot="header">
                        <Icon type="android-contacts"></Icon>
                        不同权限用户的不同菜单
                    </div>
                    <div class="row">
                        <div class="col-4">
                            <Row type="flex" justify="center" align="middle" class="access-change-access-con-row">
                                <i-switch :value="switchValue" @on-change="changeAccess" size="large"></i-switch>
                            </Row>
                        </div>
                        <div class="col-8">
                            <Row type="flex" justify="center" align="middle" class="access-change-access-con-row">
                                <p>您可以通过左侧的开关来切换当前用户的权限值，然后您可以观察左侧菜单栏的变化，如果当前用户的权限值是<b> 0 </b>，则左侧菜单栏会显示’权限测试页‘这一项('权限测试页'只用于测试，点击不会跳转)。
                                </p>
                            </Row>
                        </div>
                    </div>
                </bs4-card>
            </div>
        </div>
    </div>
</template>

<script>
  import Cookies from 'js-cookie'
  import Bs4Card from '@/components/bootstrap4/card.vue'

  export default {
    name: 'access_index',
    components: {
      Bs4Card
    },
    data () {
      return {
        accessCode: parseInt(Cookies.get('access')),
        switchValue: parseInt(Cookies.get('access')) === 1
      }
    },
    computed: {
      avatorPath () {
        return localStorage.avatorImgPath
      }
    },
    methods: {
      changeAccess (res) {
        if (res) {
          this.accessCode = 1
          Cookies.set('access', 1)
        } else {
          this.accessCode = 0
          Cookies.set('access', 0)
        }
        this.$store.commit('updateMenulist')
      }
    }
  }
</script>
<style lang="less">
    @import '../../styles/common.less';
    @import './access.less';
</style>
