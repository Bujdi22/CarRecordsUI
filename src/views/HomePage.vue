<template>
  <ion-page>

    <header-toolbar>Home</header-toolbar>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">{{ $route.params.id }}</ion-title>
        </ion-toolbar>
      </ion-header>

      <div class="container">
        Home
        {{ some }}
        <br>
      </div>

    </ion-content>

  </ion-page>


</template>

<script setup lang="ts">
import HeaderToolbar from "@/components/HeaderToolbar.vue";
import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from "@ionic/vue";

</script>
<script lang="ts">

export default {
  data() {
    return {
      some: 2,
    }
  },
}
</script>

<style scoped>

</style>