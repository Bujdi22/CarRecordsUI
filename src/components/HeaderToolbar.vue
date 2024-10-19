<template>
  <ion-header :translucent="true">
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-menu-button color="primary"></ion-menu-button>
      </ion-buttons>
      <ion-title>
        <slot></slot>
      </ion-title>
      <ion-chip slot="end" @click="$router.push('/login')">
        <ion-avatar>
          <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
        </ion-avatar>
        <ion-label>Welcome, Guest</ion-label>
      </ion-chip>
    </ion-toolbar>
  </ion-header>
</template>

<script setup lang="ts">

import {IonButtons, IonHeader, IonMenuButton, IonTitle, IonToolbar} from "@ionic/vue";
</script>

<style scoped>

</style>