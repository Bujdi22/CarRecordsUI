<template>
  <ion-page>
    <header-toolbar>Home</header-toolbar>
    <ion-content>
      <ion-progress-bar v-if="loading" type="indeterminate"></ion-progress-bar>
      <div class="container">
        <div class="has-background page-style">
          <h1>👋 Welcome to AutoJournal</h1>
          <p>Effortlessly keep your vehicle maintenance records organized and up-to-date!</p>

          <div class="m-t-10">
            <h4>Latest Activities</h4>

            <div v-if="loading">
              <skeleton-card></skeleton-card>
              <skeleton-card></skeleton-card>
            </div>

            <div v-else class="m-t-20 is-grid-desktop">
              <ion-card
                  v-if="latestVehicle"
                  class="ion-activatable ripple-parent rounded-rectangle mouse-pointer is-grid-item-desktop is-half-desktop"
                  @click="openVehicle(latestVehicle)"
              >
                <ion-ripple-effect></ion-ripple-effect>
                <div class="card-icon-header">
                  <div class="icon">
                    <img v-if="latestVehicle.icon"
                         :src="latestVehicle.icon"
                         style="height: 50px;"
                    />
                    <ion-icon v-else :icon="carOutline"></ion-icon>
                  </div>

                  <ion-card-title>{{ latestVehicle.displayName }}</ion-card-title>

                </div>

                <table class="table">
                  <tbody>
                  <tr>
                    <th>Registration:</th>
                    <td>{{ latestVehicle.registration }}</td>
                  </tr>
                  <tr>
                    <th>Make:</th>
                    <td>{{ latestVehicle.make }}</td>
                  </tr>
                  <tr>
                    <th>Model:</th>
                    <td>
                      {{ latestVehicle.model }}
                    </td>
                  </tr>
                  </tbody>
                </table>
              </ion-card>

              <ion-card v-if="latestRecord"
                        class="ion-activatable ripple-parent rounded-rectangle mouse-pointer is-grid-item-desktop is-half-desktop"
                        @click="viewRecord(latestRecord)"
              >
                <ion-ripple-effect></ion-ripple-effect>
                <div class="card-icon-header">
                  <div class="icon">
                    <FontAwesomeIcon :icon="faWrench" class="m-r-5"></FontAwesomeIcon>
                  </div>
                  <ion-card-title>
                    {{ latestRecord.title }}
                  </ion-card-title>
                </div>
                <table class="table">
                  <tbody>
                    <tr>
                      <th> Created</th>
                      <td> {{ formatDate(latestRecord.createdAt) }}</td>
                    </tr>
                    <tr>
                      <th> Odometer </th>
                      <td> {{ latestRecord.odometer }}</td>
                    </tr>
                    <tr>
                      <th> Serviced </th>
                      <td> {{ latestRecord.description.items.length }} item(s)</td>
                    </tr>
                  </tbody>
                </table>
              </ion-card>

              <ion-card class="is-grid-item-desktop is-half-desktop">

                <div class="card-icon-header">
                  <div class="icon">
                    <ion-icon :icon="clipboardOutline"></ion-icon>
                  </div>
                  <ion-card-title>Total Records</ion-card-title>
                </div>
                <table class="table">
                  <tbody>
                  <tr>
                    <th> Vehicles</th>
                    <td> {{ vehicleCount }} created</td>
                  </tr>
                  <tr>
                    <th> Maintenance Records</th>
                    <td> {{ recordCount }} created</td>
                  </tr>
                  </tbody>
                </table>
              </ion-card>
            </div>
          </div>

        </div>
        <p class="copyright-text">AutoJournal {{ getYear() }}</p>

      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import HeaderToolbar from "@/components/HeaderToolbar.vue";
import {
  IonCard,
  IonCardTitle,
  IonContent,
  IonIcon,
  IonPage,
  IonProgressBar,
  IonRippleEffect
} from "@ionic/vue";
import {formatDate, getYear} from "@/utils/dateUtils";
import SkeletonCard from "@/components/SkeletonCard.vue";
import {carOutline, clipboardOutline} from "ionicons/icons";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {faWrench} from "@fortawesome/free-solid-svg-icons";
</script>
<script lang="ts">

import {defineComponent} from "vue";
import {mapState} from "vuex";
import axiosInstance from "@/config/axiosConfig";
import useCarlogos from "@/mixins/useCarlogos";
import {Vehicle} from "@/interfaces/Vehicle";
import {MaintenanceRecord} from "@/interfaces/MaintenanceRecord";

export default defineComponent({
  name: 'HomePage',
  mixins: [useCarlogos],
  computed: {
    ...mapState({
      account: state => state.account
    })
  },
  data() {
    return {
      vehicleCount: 0,
      recordCount: 0,
      latestVehicle: null as Vehicle | null,
      latestRecord: null as MaintenanceRecord | null,
      loading: true,
    }
  },
  mounted() {
    this.load();
  },
  methods: {
    load() {
      this.loading = true;
      axiosInstance.get('/api/dashboard').then(async ({data}) => {
        this.latestRecord = data.record;
        this.latestVehicle = data.vehicle;
        this.recordCount = data.recordCount;
        this.vehicleCount = data.vehicleCount;
        if (this.latestVehicle) {
          this.latestVehicle.icon = await this.getLogo(this.latestVehicle.make)
        }
      }).finally(this.loading = false)
    },
    openVehicle(vehicle) {
      this.$router.push(`/vehicles/${vehicle.id}`);
    },
    viewRecord(record: MaintenanceRecord) {
      this.$router.push({path: `/vehicles/view-maintenance-record/${record.id}`})
    },
  }
})
</script>

<style scoped>
ion-icon {
  margin-right: 6px;
}
</style>