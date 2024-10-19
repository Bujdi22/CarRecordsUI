<template>
  <ion-page>
    <header-toolbar>About</header-toolbar>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">{{ $route.params.id }} Test</ion-title>
        </ion-toolbar>
      </ion-header>

      <div class="container">
        About
      </div>

    </ion-content>

  </ion-page>


</template>

<script setup lang="ts">

import {IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar} from "@ionic/vue";
import HeaderToolbar from "@/components/HeaderToolbar.vue";
</script>

<style scoped>

</style>