<template>
  <ion-header :translucent="true">
    <ion-toolbar>
      <ion-buttons v-if="hasBackButton || backButtonTarget" slot="start">
        <router-link v-if="backButtonTarget" :to="backButtonTarget">
          <ion-button color="dark">
            <ion-icon :icon="arrowBackOutline" slot="icon-only"></ion-icon>
          </ion-button>
        </router-link>
        <ion-back-button v-else></ion-back-button>
      </ion-buttons>
      <ion-buttons v-else slot="start">
        <ion-menu-button color="primary"></ion-menu-button>
      </ion-buttons>
      <ion-chip slot="end" @click="$router.push(account ? '/account' : '/login')"
                :color="account ? 'primary' : 'medium' ">
        <ion-avatar>
          <ion-icon :icon="personCircleOutline" style="font-size: 1.7em"></ion-icon>
        </ion-avatar>
        <ion-label v-if="account">
          Welcome, {{ account.displayName }}
        </ion-label>
        <ion-label v-else>Login</ion-label>
      </ion-chip>
    </ion-toolbar>
    <ion-toolbar>
      <ion-title>
        <slot></slot>
      </ion-title>
      <slot name="raw"></slot>
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
  IonIcon,
  IonBackButton,
  IonButton,
} from "@ionic/vue";
import {arrowBackOutline, personCircleOutline} from "ionicons/icons";

</script>

<script lang="ts">
import {mapState} from "vuex";

export default {
  props: {
    hasBackButton: {type: Boolean, required: false, default: false},
    backButtonTarget: {type: String, required: false},
  },
  computed: mapState({
    account: state => state.account
  }),
}

</script>

<style scoped>

</style>