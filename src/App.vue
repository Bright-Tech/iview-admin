<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style lang="scss">
    @import "./styles/variables";
    @import "~bootstrap/scss/bootstrap.scss";
    html, body, #app {
        width: 100%;
        height: 100%;
        background: #f0f0f0;
        overflow: hidden;
    }

</style>
