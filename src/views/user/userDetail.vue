<template>
    <div>
        <Card dis-hover>
            <p slot="title">用户详情</p>
            <p>当前用户的id为{{userId}}</p>
        </Card>
    </div>
</template>
<script>
    export default{
      data () {
        return {
          userId: this.$route.params.userId
        }
      }
    }
</script>