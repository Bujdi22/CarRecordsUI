<template>
  <ion-list :inset="true" class="error-list" v-if="errors">
    <h3>
      There were error(s) in your submission:
    </h3>
    <ion-item v-for="(error, key) in errors" :key="key">
      <ion-label>
        <h2>{{ humanize(key) }}</h2>
        <div style="color: #8c8c8c" v-html="getRenderedError(error)"></div>
      </ion-label>
    </ion-item>
  </ion-list>
  <div v-else></div>


</template>

<script setup lang="ts">

import {IonItem, IonLabel, IonList} from "@ionic/vue";
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