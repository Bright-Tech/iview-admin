<template>
    <div>
        <tags-page-opened :pageTagsList="pageTagsList"></tags-page-opened>
    </div>
</template>
<script>
  import tagsPageOpened from './components/tagsPageOpened.vue'

  export default {
    name: '',
    components: {
      tagsPageOpened
    },
    computed: {
      tagsList () {
        return this.$store.state.tagsList  // 所有页面的页面对象
      },
      pageTagsList () {
        return this.$store.state.pageOpenedList  // 打开的页面的页面对象
      }
    }
  }
</script>