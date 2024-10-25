<template>
  <ion-list :inset="true" class="error-list" v-if="errors">
    <h3>
      There were error(s) in your submission:
    </h3>
    <ion-item v-for="(error, key) in errors" :key="key">
      <ion-label>
        <h2>{{ humanize(key) }}</h2>
        <p>{{ error }}</p>
      </ion-label>
    </ion-item>
  </ion-list>
  <div v-else></div>


</template>

<script setup lang="ts">

import {IonItem, IonLabel, IonList} from "@ionic/vue";
</script>

<script lang="ts">

export default {
  props: {
    errors: {required: false}
  },
  methods: {
    humanize(str) {
      let i, frags = str.split('_');
      for (i = 0; i < frags.length; i++) {
        frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
      }
      return frags.join(' ');
    }
  }
}

</script>
<style scoped>

</style>