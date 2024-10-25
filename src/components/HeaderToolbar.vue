<template>
  <ion-header :translucent="true">
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-menu-button color="primary"></ion-menu-button>
      </ion-buttons>
      <ion-chip slot="end" @click="$router.push(account ? '/account' : '/login')" :color="account ? 'primary' : 'medium' ">
        <ion-avatar>
          <ion-icon :icon="personCircleOutline" style="font-size: 1.7em"></ion-icon>
        </ion-avatar>
        <ion-label v-if="account">
          Welcome, {{ account.username }}
        </ion-label>
        <ion-label v-else>Login</ion-label>
      </ion-chip>
    </ion-toolbar>
    <ion-toolbar>
      <ion-title>
        <slot></slot>
      </ion-title>
    </ion-toolbar>
  </ion-header>
</template>

<script setup lang="ts">

import {
  IonButtons,
  IonHeader,
  IonMenuButton,
  IonTitle,
  IonToolbar,
  IonChip,
  IonAvatar,
  IonLabel,
  IonIcon
} from "@ionic/vue";
import {personCircleOutline} from "ionicons/icons";

</script>
<script lang="ts">
import {mapState} from "vuex";
export default {

  computed: mapState({
    account: state => state.account
  })
}

</script>

<style scoped>

</style>