<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>
        Maintenance Record
      </ion-title>
      <ion-buttons slot="end">
        <ion-button @click="close" :strong="true">
          <ion-icon slot="icon-only" :icon="closeCircleOutline()"></ion-icon>
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <h5>Details</h5>
    <ion-list>
      <ion-item>
        <div>
          <p class="item-heading">Title</p>
          <p class="item-value">{{ record.title }}</p>
        </div>
      </ion-item>
      <ion-item>
        <div>
          <p class="item-heading">Date carried out</p>
          <p class="item-value">{{ formatDate(record.date) }}</p>
        </div>
      </ion-item>
      <ion-item>
        <div>
          <p class="item-heading">Date recorded</p>
          <p class="item-value">{{ formatDate(record.createdAt) }}</p>
        </div>
      </ion-item>
    </ion-list>
    <h5>Serviced Items</h5>
    <ion-list>
      <ion-item v-for="(item, key) in record.description.items" :key="key">
        <ion-icon :icon="checkmarkOutline()" color="primary"></ion-icon>
        <p>{{ item }}</p>
      </ion-item>
    </ion-list>
  </ion-content>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  IonItem,
  IonInput,
  modalController, IonIcon,
} from '@ionic/vue';
import {MaintenanceRecord} from "@/interfaces/MaintenanceRecord";
import {checkmarkOutline, closeCircleOutline} from "ionicons/icons";
import moment from "moment/moment";
export default defineComponent({
  name: "MaintenanceRecordModal",
  props: {
    record: {type: Object as PropType<MaintenanceRecord>, required: true},
  },
  components: {
    IonIcon,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonButton,
    IonItem,
    IonInput,
  },
  data() {
    return {
     name: '',
    }
  },
  methods: {
    checkmarkOutline() {
      return checkmarkOutline
    },
    closeCircleOutline() {
      return closeCircleOutline
    },
    close() {
      modalController.dismiss(null, 'confirm');
    },

    formatDate(date: string): string {
      return moment(date).format('LL');
    },
  }
})

</script>

<style scoped>
h5 {
  margin-left: 6px;
}
ion-item ion-icon {
  margin-right: 12px;
}
</style>