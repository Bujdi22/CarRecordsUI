<template>
  <message-banner v-if="errors" type="is-danger">
    <template #title>
      <span>Error:</span>
    </template>
    <ul v-for="(error, key) in errors" :key="key">
      <li>
        <div v-if="isErrorList(error)">
          <p>{{ humanize(key) }}</p>
          <div style="color: #8c8c8c" v-html="getRenderedListError(error)"></div>
        </div>
        <p v-else> {{ humanize(key) }}: {{ error }}</p>
      </li>
    </ul>
  </message-banner>
  <div v-else></div>

</template>

<script setup lang="ts">

import {humanize} from "@/utils/stringUtils";
import MessageBanner from "@/components/MessageBanner.vue";
</script>

<script lang="ts">

export default {
  props: {
    errors: {required: false}
  },
  methods: {
    getRenderedListError(error: string): string {
      const parts = error.split(';');
      let rendered = '<ul>';

      parts.forEach((part) => rendered += `<li>${part}</li>`)

      return rendered + '</ul>'

    },
    isErrorList(error: string) {
      return error.includes(";");
    }
  }
}

</script>
<style scoped>
</style>