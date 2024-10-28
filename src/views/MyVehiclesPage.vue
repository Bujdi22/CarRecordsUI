<template>
  <ion-page>

    <header-toolbar>My Vehicles</header-toolbar>
    <ion-content>

      <div class="container">

        <router-link to="/vehicles/add">
          <ion-button>
            <ion-icon slot="start" :icon="addOutline"></ion-icon>
            Add vehicle
          </ion-button>
        </router-link>

        <ion-card v-for="vehicle in vehicles" :key="vehicle.id">
          <div class="card-icon-header">
            <ion-icon :icon="carOutline"></ion-icon>
          </div>

          <ion-card-header>

            <ion-card-title>{{ vehicle.displayName }}</ion-card-title>

          </ion-card-header>

          <ion-card-content>
            <ion-card-subtitle>Make: {{ vehicle.make }}</ion-card-subtitle>
            <ion-card-subtitle>Model: {{ vehicle.model }}</ion-card-subtitle>
            <ion-card-subtitle>Year: {{ vehicle.year }}</ion-card-subtitle>
            <ion-card-subtitle>Maintenance records: none</ion-card-subtitle>
          </ion-card-content>
        </ion-card>
      </div>

    </ion-content>

  </ion-page>


</template>
<script setup lang="ts">
import axiosInstance from '@/config/axiosConfig';
import {IonContent, IonPage, IonButton, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent} from "@ionic/vue";
import {addOutline, carOutline} from "ionicons/icons";
import HeaderToolbar from "@/components/HeaderToolbar.vue";
</script>

<script lang="ts">
export default {
  data() {
    return {
      vehicles: [],
    }
  },

  mounted() {
    this.vehicles = [];
    this.load();
  },

  methods: {
    load() {
      axiosInstance.get('/api/vehicles').then(({data}) => {
        this.vehicles = data;
      })
    },
  }
}
</script>

<style scoped>
</style>