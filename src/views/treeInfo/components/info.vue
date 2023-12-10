<template>
  <a-modal :title="title" :visible="visible">
    <slot></slot>
  </a-modal>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    visible: {
      type: Boolean
    }
  }
}
</script>

<style>
</style>
