<template>
  <ion-page>
    <ion-progress-bar v-if="loading" type="indeterminate"></ion-progress-bar>
    <header-toolbar>
      <template #raw>
          <ion-buttons slot="start">
            <router-link to="/vehicles/add">
              <ion-button color="primary" shape="round">
                <ion-icon slot="start" :icon="add()"></ion-icon>
                <p>Add a vehicle</p>
              </ion-button>
            </router-link>
          </ion-buttons>
          <ion-title>My Vehicles</ion-title>
      </template>
    </header-toolbar>
    <ion-content>

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
            <div class="icon">
              <img v-if="vehicle.icon"
                   :src="vehicle.icon"
                   style="height: 50px;"
              />
              <ion-icon v-else :icon="carOutline()"></ion-icon>
            </div>

            <ion-card-title>{{ vehicle.displayName }}</ion-card-title>

          </div>

          <ion-card-content>
            <ion-card-subtitle>Make: {{ vehicle.make }}</ion-card-subtitle>
            <ion-card-subtitle>Model: {{ vehicle.model }}</ion-card-subtitle>
            <ion-card-subtitle>Year: {{ vehicle.year }}</ion-card-subtitle>
            <ion-card-subtitle>Maintenance records: none</ion-card-subtitle>
            <ion-card-subtitle>Created: {{ formatCreatedAt(vehicle.createdAt) }}</ion-card-subtitle>
            <ion-card-subtitle>Last update: {{ formatUpdatedAt(vehicle.updatedAt) }}</ion-card-subtitle>

            <router-link :to="`/vehicles/${vehicle.id}`">
              <ion-button shape="round" fill="outline">View</ion-button>
            </router-link>

          </ion-card-content>

        </ion-card>
      </div>

    </ion-content>

  </ion-page>


</template>
<script lang="ts">
import axiosInstance from '@/config/axiosConfig';
import {IonContent, IonPage, IonButton, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, onIonViewDidEnter, IonFabButton, IonFab, IonProgressBar, IonButtons, IonTitle} from "@ionic/vue";
import {add, carOutline} from "ionicons/icons";
import carmakers from "@/assets/carmakers.json";
import HeaderToolbar from "@/components/HeaderToolbar.vue";
import moment from "moment";

export default {
  components: {
    IonContent, IonPage, IonButton, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonFabButton, IonFab, IonProgressBar, IonButtons, IonTitle,
    HeaderToolbar,
  },
  data() {
    return {
      loading: false,
      vehicles: [],
      carmakers: carmakers,
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
        this.vehicles = data.map((vehicle) => {
          vehicle.icon = this.carmakers.brands.filter((brand) => vehicle.make === brand.name)?.[0]?.path;
          return vehicle;
        });

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