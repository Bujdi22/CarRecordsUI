<template>
  <ion-page>
    <header-toolbar>Home</header-toolbar>
    <ion-content>
      <div class="container">
        <div class="home-section">

          <h1>Welcome to AutoJournal</h1>
          <p>Keeping your vehicle maintenance records up to date just got super easy!</p>
          <h4 style="margin-top:60px">
            Watch out! Our journey just began, but
          </h4>
          <h2>We are coming soon to iOS and Android devices!</h2>
          <h1 class="is-color-primary">
            <ion-icon :icon="logoAndroid"></ion-icon>
            <ion-icon :icon="logoApple" style="margin-left: 20px;"></ion-icon>
          </h1>
          <p>Check your favourite place to get applications soon, so you'll be able to manage your records from anywhere!</p>

          <div class="image-container">
            <img src="/src/assets/car-service-svgrepo-com.svg"/>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import HeaderToolbar from "@/components/HeaderToolbar.vue";
import {IonContent, IonIcon, IonPage} from "@ionic/vue";
import {logoAndroid, logoApple} from "ionicons/icons";
</script>
<script lang="ts">

import {defineComponent} from "vue";

export default defineComponent({
  name: 'HomePage',
  data() {
    return {
    }
  },
})
</script>

<style scoped>
.image-container {
  text-align: center;
  margin-top: 80px;
}
img {
  width: 30%;
}
</style>