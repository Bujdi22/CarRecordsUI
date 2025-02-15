<template>
  <div v-if="errors" class="message-banner is-danger">
    <p>
      <strong>
        Error:
      </strong>
    </p>
    <ul v-for="(error, key) in errors" :key="key">
      <li>
        <p>{{ humanize(key) }}</p>
        <div style="color: #8c8c8c" v-html="getRenderedError(error)"></div>
      </li>
    </ul>
  </div>
  <div v-else></div>


</template>

<script setup lang="ts">

import {humanize} from "@/utils/stringUtils";
</script>

<script lang="ts">

export default {
  props: {
    errors: {required: false}
  },
  methods: {
    getRenderedError(error: string): string {
      if (error.includes(";")) {
        const parts = error.split(';');
        let rendered = '<ul>';

        parts.forEach((part) => rendered += `<li>${part}</li>`)

        return rendered + '</ul>'
      }
      return `<p>${error}</p>`;
    }
  }
}

</script>
<style scoped>
</style>