<template>
<div style="padding:0 16px;">
  <ion-toolbar>
    <ion-button slot="end" color="primary" shape="round" style="margin-right: 20px;" @click="addRecord">
      <ion-icon slot="start" :icon="add()"></ion-icon>
      Add
    </ion-button>
    <ion-title>Records</ion-title>
  </ion-toolbar>
  <ion-spinner v-if="loading" style="margin: auto"></ion-spinner>
  <ion-card v-else v-for="record in records" :key="record.id"
            class="ion-activatable ripple-parent rounded-rectangle mouse-pointer"
            @click="viewRecord(record)"
  >
    <ion-ripple-effect></ion-ripple-effect>
    <ion-card-header>
      <ion-card-title>
        <FontAwesomeIcon :icon="faWrench()" class="m-r-5"></FontAwesomeIcon>
        {{ record.title }}
      </ion-card-title>
    </ion-card-header>

    <ion-card-content>
      <ion-card-subtitle>Date: {{ formatDate(record.date) }}</ion-card-subtitle>
      <ion-card-subtitle>Created: {{ formatDate(record.createdAt) }}</ion-card-subtitle>
      <ion-button
          shape="round"
          fill="outline"
          @click.stop="viewRecord(record)">
        View
      </ion-button>

    </ion-card-content>
  </ion-card>
</div>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue'
import {Vehicle} from "@/interfaces/Vehicle";
import {MaintenanceRecord} from "@/interfaces/MaintenanceRecord";
import axiosInstance from "@/config/axiosConfig";
import Toast from "@/utils/toast";
import {
  IonSpinner,
  IonButton,
  IonToolbar,
  IonButtons,
  IonTitle,
  IonIcon,
  IonCard,
  IonCardTitle,
  IonCardSubtitle,
  IonRippleEffect,
  IonCardHeader,
  IonCardContent,
} from "@ionic/vue";
import {add} from "ionicons/icons";
import {formatDate} from "@/utils/dateUtils";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {faWrench} from "@fortawesome/free-solid-svg-icons";

export default defineComponent({
  name: "MaintenanceRecords",
  components: {
    IonCardSubtitle, IonCardHeader, IonCardContent,
    FontAwesomeIcon, IonCardTitle, IonCard, IonIcon, IonSpinner, IonButton, IonToolbar, IonButtons, IonTitle, IonRippleEffect},
  props: {
    vehicle: {type: Object as PropType<Vehicle>, required: true},
  },
  data() {
    return {
      records: [] as MaintenanceRecord[],
      loading: false,
    }
  },
  mounted() {
    this.load();
  },
  methods: {
    faWrench() {
      return faWrench
    },
    formatDate,
    add() {
      return add
    },
    load() {
      this.loading = true;
      axiosInstance.get(`/api/maintenance-records/${this.vehicle.id}`).then(({data}) => {
        this.records = data;
        this.loading = false;
      }).catch((error) => {
        console.error(error);
        this.loading = false;
        Toast.fire({
          icon: "error",
          title: "Something went wrong",
        });
      })
    },
    viewRecord(record: MaintenanceRecord) {
      this.$store.commit('setCachedRecord', record);
      this.$router.push({path: `/vehicles/view-maintenance-record/${record.id}`})
    },
    addRecord() {
      this.$store.commit('setCachedVehicle', this.vehicle);
      this.$router.push({path: `/vehicles/create-maintenance-record/${this.vehicle.id}`});
    },
  }
})
</script>

<style scoped>

</style>