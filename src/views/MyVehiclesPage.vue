<template>
  <ion-page>
    <header-toolbar>My Vehicles</header-toolbar>

    <ion-content :fullscreen="true">

      <div class="container">
        My Vehicles
      </div>

    </ion-content>

  </ion-page>


</template>

<script setup lang="ts">

import { IonContent, IonPage} from "@ionic/vue";
import HeaderToolbar from "@/components/HeaderToolbar.vue";
</script>

<style scoped>

</style>