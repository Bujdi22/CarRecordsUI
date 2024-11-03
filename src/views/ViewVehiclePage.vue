<template>
  <ion-page>
    <ion-progress-bar v-if="loading" type="indeterminate"></ion-progress-bar>
    <header-toolbar :has-back-button="true">
      {{ vehicle.displayName }}
    </header-toolbar>
    <ion-content>
      <div v-if="fail" class="container">
        <h3>
          Sorry, vehicle not found
        </h3>
        <router-link to="/vehicles">
          <ion-button color="primary">Vehicles page</ion-button>
        </router-link>
      </div>
      <div v-else class="container">
        <ion-list :inset="true">

          <ion-item>
            <ion-label>
              Make: {{ vehicle.make }}
            </ion-label>
          </ion-item>
          <ion-item>
            <ion-label>
              Model: {{ vehicle.model }}
            </ion-label>
          </ion-item>
          <ion-item>
            <ion-label>
              Year:
              {{ vehicle.year }}
            </ion-label>
          </ion-item>
          <ion-item>
            <ion-label>
              Created:
              {{ formatCreatedAt(vehicle.createdAt) }}
            </ion-label>
          </ion-item>
          <ion-item>
            <ion-label>
              Last update:
              {{ formatUpdatedAt(vehicle.updatedAt) }}
            </ion-label>
          </ion-item>

        </ion-list>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import axiosInstance from '@/config/axiosConfig';
import {defineComponent} from 'vue'
import HeaderToolbar from "@/components/HeaderToolbar.vue";
import {IonCardContent, IonCardSubtitle, IonContent, IonPage, IonProgressBar, onIonViewDidEnter, IonButton} from "@ionic/vue";
import moment from "moment/moment";

export default defineComponent({
  name: "ViewVehiclePage",
  components: {IonCardSubtitle, IonCardContent, IonProgressBar, IonPage, IonContent, HeaderToolbar, IonButton},
  data() {
    return {
      vehicle: {},
      records: [],
      loading: false,
      fail: false,
    }
  },
  created() {
    onIonViewDidEnter(() => {
      this.load();
    });
  },
  methods: {
    load() {
      this.loading = true;
      this.fail = false;
      axiosInstance.get(`/api/vehicles/${this.$route.params.id}`).then(({data}) => {
        this.vehicle = data;
        this.loading = false;
      }).catch(() => {
        this.loading = false;
        this.fail = true;
      });
    },
    formatCreatedAt(date) {
      return moment(date).format('LLLL');
    },

    formatUpdatedAt(date) {
      return moment(date).fromNow();
    },
  },
})
</script>

<style scoped>

</style>