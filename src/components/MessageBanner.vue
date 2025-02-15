<template>
<div class="message-banner" :class="type">
  <p class="m-b-10">
    <strong><slot name="title"></slot></strong>
  </p>
  <slot></slot>
</div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "MessageBanner",
  props: {
    type: {required: true, type: String},
  }
})
</script>

<style scoped>

</style>