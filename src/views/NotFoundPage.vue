<template>
  <ion-page>

    <header-toolbar>Not found</header-toolbar>
    <ion-content>


      <div class="container">
        <h3>
          Sorry, page not found
        </h3>
        <router-link to="/home">
          <ion-button color="primary">Home page</ion-button>
        </router-link>
      </div>

    </ion-content>

  </ion-page>


</template>

<script setup lang="ts">

import {IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from "@ionic/vue";
import HeaderToolbar from "@/components/HeaderToolbar.vue";

</script>

<style scoped>

</style>