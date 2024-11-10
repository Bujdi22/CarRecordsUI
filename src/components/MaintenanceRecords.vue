<template>
<div style="padding:0 16px;">
  <ion-toolbar>
    <ion-buttons slot="end">
      <ion-button color="secondary" shape="round" style="margin-right: 20px;" @click="addRecord">
        <ion-icon slot="start" :icon="add()"></ion-icon>
        Add
      </ion-button>
    </ion-buttons>
    <ion-title>Maintenance Records</ion-title>
  </ion-toolbar>
  <ion-spinner class="is-loading" v-if="loading" style="margin: auto"></ion-spinner>
  <div v-else class="has-background has-padding" style="margin-bottom: 20px">
    <div v-if="!records.length" class="has-padding">
      <h4>
        You do not have any records yet.
      </h4>
      <p>
        Please use the button to add your maintenance record!
      </p>
    </div>
    <table v-else class="formatted-table">
      <thead>
      <tr>
        <th>Service</th>
        <th>Date</th>
        <th>Created</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="record in records" :key="record.id">
        <td>{{ record.title }}</td>
        <td>{{ formatDate(record.date) }}</td>
        <td>{{ formatDate(record.date) }}</td>
        <td style="text-align: right"> <ion-button size="small" @click="viewRecord(record)">View</ion-button> </td>
      </tr>
      </tbody>
    </table>
  </div>
</div>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue'
import {Vehicle} from "@/interfaces/Vehicle";
import {MaintenanceRecord} from "@/interfaces/MaintenanceRecord";
import axiosInstance from "@/config/axiosConfig";
import Toast from "@/utils/toast";
import {modalController, IonSpinner, IonButton, IonToolbar, IonButtons, IonTitle, IonIcon} from "@ionic/vue";
import {add} from "ionicons/icons";
import MaintenanceRecordModal from "@/components/MaintenanceRecordModal.vue";
import {formatDate} from "@/utils/dateUtils";

export default defineComponent({
  name: "MaintenanceRecords",
  components: {IonIcon, IonSpinner, IonButton, IonToolbar, IonButtons, IonTitle},
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
    async viewRecord(record: MaintenanceRecord) {
      const modal = await modalController.create({
        component: MaintenanceRecordModal,
        cssClass: 'modal-fullscreen',
        componentProps: {record, vehicleId: this.vehicle.id},
      })
      modal.present();

      const { data, role } = await modal.onWillDismiss();

      if (role === 'confirm' && data) {
        this.load();
      }
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