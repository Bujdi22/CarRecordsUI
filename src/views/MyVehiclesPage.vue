<template>
  <ion-page>
    <ion-progress-bar v-if="loading" type="indeterminate"></ion-progress-bar>
    <header-toolbar>
      <template #raw>
        <ion-buttons slot="start">
          <router-link to="/vehicles/add">
            <ion-button color="primary" shape="round">
              <ion-icon slot="start" :icon="add()"></ion-icon>
              <p>Add</p>
            </ion-button>
          </router-link>
        </ion-buttons>
        <ion-title>My Vehicles</ion-title>
      </template>
    </header-toolbar>
    <ion-content>

      <div class="container">
        <div v-if="loading">
          <skeleton-card></skeleton-card>
          <skeleton-card></skeleton-card>
          <skeleton-card></skeleton-card>
        </div>
        <div v-if="!loading && !vehicles.length" class="m-t-50">
          <div class="large-icon m-b-50">
            <FontAwesomeIcon :icon="faHouseCircleExclamation()"></FontAwesomeIcon>
          </div>
          <h1>
            You do not have any vehicles yet.
          </h1>
          <p>
            Please use the button to add your first vehicle!
          </p>

        </div>

        <div v-else class="has-background m-b-20 is-flex">
          <ion-searchbar
              placeholder="Search ..."
              v-model="searchKey"
          >
          </ion-searchbar>
          <layout-switch v-model="layout"></layout-switch>
        </div>

        <div v-if="layout === 'grid'">
          <ion-card v-for="vehicle in filteredVehicles"
                    :key="vehicle.id"
                    class="ion-activatable ripple-parent rounded-rectangle mouse-pointer"
                    @click="openVehicle(vehicle)"
          >
            <ion-ripple-effect></ion-ripple-effect>
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
        <div v-else>
          <table class="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Make & Model</th>
                <th>Reg. Plate</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="vehicle in filteredVehicles"
                :key="vehicle.id"
                @click="openVehicle(vehicle)"
              >
                <td>{{ vehicle.displayName }}</td>
                <td>{{ vehicle.make }} {{ vehicle.model }} ({{vehicle.year}})</td>
                <td>{{ vehicle.registration }}</td>
                <td style="width: 20px;">
                  <router-link :to="`/vehicles/${vehicle.id}`">
                    <ion-button shape="round" fill="outline" size="small">View</ion-button>
                  </router-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>

    </ion-content>

  </ion-page>


</template>
<script lang="ts">
import {
  IonContent,
  IonPage,
  IonButton,
  IonIcon,
  IonCard,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  onIonViewDidEnter,
  IonProgressBar,
  IonButtons,
  IonTitle,
  IonRippleEffect,
  IonSearchbar,
} from "@ionic/vue";
import {add, carOutline} from "ionicons/icons";
import HeaderToolbar from "@/components/HeaderToolbar.vue";
import SkeletonCard from "@/components/SkeletonCard.vue";
import {Vehicle} from "@/interfaces/Vehicle";
import {formatCreatedAt, formatUpdatedAt} from "../utils/dateUtils";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {faHouseCircleExclamation} from "@fortawesome/free-solid-svg-icons";
import axiosInstance from "@/config/axiosConfig";
import useCarlogos from "@/mixins/useCarlogos";
import {searchStringInArray} from "@/utils/stringUtils";
import LayoutSwitch from "@/components/LayoutSwitch.vue";

export default {
  components: {
    LayoutSwitch,
    IonRippleEffect,
    FontAwesomeIcon,
    SkeletonCard,
    IonContent,
    IonPage,
    IonButton,
    IonIcon,
    IonCard,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonProgressBar,
    IonButtons,
    IonTitle,
    HeaderToolbar,
    IonSearchbar,
  },
  mixins: [useCarlogos],
  data() {
    return {
      loading: false,
      vehicles: [] as Vehicle[],
      searchKey: '',
      layout: 'grid',
    }
  },
  created() {
    onIonViewDidEnter(() => {
      this.load();
    });
  },

  methods: {
    faHouseCircleExclamation() {
      return faHouseCircleExclamation
    },
    formatUpdatedAt,
    formatCreatedAt,
    carOutline() {
      return carOutline
    },
    add() {
      return add
    },
    load() {
      this.loading = true;
      this.vehicles = [];
      axiosInstance.get('/api/vehicles').then(async ({data}) => {
        this.vehicles = await Promise.all(data.map(async (vehicle: Vehicle) => {
          vehicle.icon = await this.getLogo(vehicle.make);
          return vehicle;
        }));

        this.loading = false;
      })
    },
    openVehicle(vehicle: Vehicle) {
      this.$router.push(`/vehicles/${vehicle.id}`);
    }
  },

  computed: {
    filteredVehicles(): Vehicle[] {
      if (!this.searchKey) {
        return this.vehicles;
      }

      return this.vehicles.filter((vehicle) => {
        return searchStringInArray(this.searchKey, [
          vehicle.displayName,
          vehicle.make,
          vehicle.model,
          vehicle.registration,
        ]);
      })
    }
  },
}
</script>

<style scoped>
</style>