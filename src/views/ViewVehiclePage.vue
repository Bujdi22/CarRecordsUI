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
        <skeleton-card :inset="true" v-if="loading"></skeleton-card>
        <ion-list :inset="true" v-else>
          <ion-item>
            <div style="margin:10px; margin-left: 0">
              <img :src="logoPath" style="height:50px"/>
            </div>
          </ion-item>
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
import {defineComponent} from 'vue'
import HeaderToolbar from "@/components/HeaderToolbar.vue";
import {IonCardContent, IonCardSubtitle, IonContent, IonPage, IonProgressBar, onIonViewDidEnter, IonButton, IonItem, IonLabel, IonList} from "@ionic/vue";
import moment from "moment/moment";
import SkeletonCard from "@/components/SkeletonCard.vue";
import carmakers from "@/assets/carmakers.json";

export default defineComponent({
  name: "ViewVehiclePage",
  components: {
    SkeletonCard,
    IonCardSubtitle, IonCardContent, IonProgressBar, IonPage, IonContent, HeaderToolbar, IonButton, IonItem, IonLabel, IonList},
  data() {
    return {
      vehicle: {},
      records: [],
      loading: false,
      fail: false,
      carmakers: carmakers,
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
      this.$axios.get(`/api/vehicles/${this.$route.params.id}`).then(({data}) => {
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
  computed: {
    logoPath() {
      if (this.vehicle) {
        return this.carmakers.brands.filter((brand) => this.vehicle.make === brand.name)?.[0]?.path;
      }
      return null;
    }
  }
})
</script>

<style scoped>

</style>