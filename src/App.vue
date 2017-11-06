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
    $font-family-sans-serif: // Safari for OS X and iOS (San Francisco)
            -apple-system, "STHeiti Light",
                // Chrome < 56 for OS X (San Francisco)
            BlinkMacSystemFont,
                // Windows
            "Segoe UI", "Microsoft YaHei",
                // Android
            "Roboto",
                // Basic web fallback
            "Helvetica Neue", Arial, sans-serif,
                // Emoji fonts
            "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol" !default;

    @import "~bootstrap/scss/bootstrap.scss";
    html, body, #app {
        width: 100%;
        height: 100%;
        background: #f0f0f0;
        overflow: hidden;
    }

</style>
