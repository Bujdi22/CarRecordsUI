<template>
  <ion-page>
    <ion-progress-bar v-if="loading" type="indeterminate"></ion-progress-bar>
    <header-toolbar>My Vehicles</header-toolbar>
    <ion-content>
        <ion-fab slot="fixed" horizontal="start" vertical="top">
          <router-link to="/vehicles/add">
            <ion-button color="primary" shape="round">
              <ion-icon slot="start" :icon="add()"></ion-icon>
              <p>Add a vehicle</p>
            </ion-button>
          </router-link>
        </ion-fab>


      <div class="container">
        <div v-if="!loading && !vehicles.length" style="margin-top:50px;">
          <h1>
            You do not have any vehicles yet.
          </h1>
          <p>
            Please use the button to add your first vehicle!
          </p>
        </div>

        <ion-card v-for="vehicle in vehicles" :key="vehicle.id">
          <div class="card-icon-header">
            <ion-icon :icon="carOutline()"></ion-icon>
          </div>

          <ion-card-header>

            <ion-card-title>{{ vehicle.displayName }}</ion-card-title>

          </ion-card-header>

          <ion-card-content>
            <ion-card-subtitle>Make: {{ vehicle.make }}</ion-card-subtitle>
            <ion-card-subtitle>Model: {{ vehicle.model }}</ion-card-subtitle>
            <ion-card-subtitle>Year: {{ vehicle.year }}</ion-card-subtitle>
            <ion-card-subtitle>Maintenance records: none</ion-card-subtitle>
            <ion-card-subtitle>Created: {{ formatCreatedAt(vehicle.createdAt) }}</ion-card-subtitle>
            <ion-card-subtitle>Last update: {{ formatUpdatedAt(vehicle.updatedAt) }}</ion-card-subtitle>

            <ion-button shape="round" fill="outline">View</ion-button>

          </ion-card-content>

        </ion-card>
      </div>

    </ion-content>

  </ion-page>


</template>
<script lang="ts">
import axiosInstance from '@/config/axiosConfig';
import {IonContent, IonPage, IonButton, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, onIonViewDidEnter, IonFabButton, IonFab} from "@ionic/vue";
import {add, carOutline} from "ionicons/icons";
import HeaderToolbar from "@/components/HeaderToolbar.vue";
import moment from "moment";

export default {
  components: {
    IonContent, IonPage, IonButton, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonFabButton, IonFab,
    HeaderToolbar,
  },
  data() {
    return {
      loading: false,
      vehicles: [],
    }
  },
  created() {
    onIonViewDidEnter(() => {
      this.load();
    });
  },

  methods: {
    carOutline() {return carOutline},
    add() {return add},
    load() {
      this.loading = true;
      this.vehicles = [];
      axiosInstance.get('/api/vehicles').then(({data}) => {
        this.vehicles = data;
        this.loading = false;
      })
    },

    formatCreatedAt(date) {
      return moment(date).format('LLLL');
    },

    formatUpdatedAt(date) {
      return moment(date).fromNow();
    },
  }
}
</script>

<style scoped>
</style>