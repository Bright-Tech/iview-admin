<template>
    <div class="card">
        <div class="card-header" v-if="this.$slots.header">
            <slot name="header"></slot>
        </div>
        <div class="card-body">
            <slot></slot>
        </div>
    </div>
</template>

<script>
  export default {
    name: '',
    created () {
      console.log(this.$slots)
    }
  }
</script>