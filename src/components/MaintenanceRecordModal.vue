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
          <p class="item-heading is-color-primary">Title</p>
          <p class="item-value">{{ record.title }}</p>
        </div>
      </ion-item>
      <ion-item>
        <div>
          <p class="item-heading is-color-primary">Date carried out</p>
          <p class="item-value">{{ formatDate(record.date) }}</p>
        </div>
      </ion-item>
      <ion-item>
        <div>
          <p class="item-heading is-color-primary">Date recorded</p>
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
    <h5>Files</h5>
    <ion-list v-if="imageUrlsResolved">
      <ion-item v-for="(file, key) in record.media">
        <img :src="(file.resolvedImageUrl)" alt="test"/>
      </ion-item>
    </ion-list>
  </ion-content>
  <ion-footer style="text-align: right;">
    <ion-button style="margin-top:20px; padding-right: 0"
                @click="destroy"
                color="danger"
                class="has-padding"
    >
      <ion-icon slot="start" :icon="trashOutline()"></ion-icon>
      Delete
    </ion-button>
    <ion-button style="margin-top:20px"
                @click="edit"
                color="primary"
                class="has-padding"
    >
      <ion-icon slot="start" :icon="createOutline()"></ion-icon>
      Edit
    </ion-button>
  </ion-footer>
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
  modalController, IonIcon, IonFooter,
    IonList,
} from '@ionic/vue';
import {MaintenanceRecord} from "@/interfaces/MaintenanceRecord";
import {checkmarkOutline, closeCircleOutline, createOutline, trashOutline} from "ionicons/icons";
import {formatDate} from "@/utils/dateUtils";
import Confirm from "@/utils/confirm";
import axiosInstance from "@/config/axiosConfig";
import Toast from "@/utils/toast";
export default defineComponent({
  name: "MaintenanceRecordModal",
  props: {
    record: {type: Object as PropType<MaintenanceRecord>, required: true},
    vehicleId: {type: Number, required: true},
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
    IonFooter,
    IonList,
  },
  data() {
    return {
     name: '',
     imageUrlsResolved: false,
    }
  },
  mounted() {
    this.resolveImages();
  },
  methods: {
    trashOutline() {
      return trashOutline
    },
    createOutline() {
      return createOutline
    },
    formatDate,
    checkmarkOutline() {
      return checkmarkOutline
    },
    closeCircleOutline() {
      return closeCircleOutline
    },
    close() {
      modalController.dismiss(null, 'confirm');
    },
    edit() {
      this.$router.push({path: `/vehicles/edit-maintenance-record/${this.vehicleId}/${this.record.id}`})
      modalController.dismiss(null, 'confirm');
    },
    destroy() {
      Confirm.fire({
        title: "Are you sure?",
        text: "Press confirm if you would like to delete this record.",
      }).then((result) => {
        if (result.isConfirmed) {
          axiosInstance.delete(`/api/maintenance-records/${this.record.id}`)
              .then(() => {
                Toast.fire({icon: 'success', title: 'Record deleted'});
                modalController.dismiss(true, 'confirm');
              })
              .catch((error) => {
                console.error(error);
                Toast.fire({icon: 'error', title: 'Something went wrong'});
              })
        }
      });
    },
    async getImageUrl(media) {
      const response = await axiosInstance.get(`/api/file/download/${media.id}`, {responseType: 'blob'});
      media.resolvedImageUrl = URL.createObjectURL(response.data);
    },
    async resolveImages() {
      for (const media of this.record.media) {
        await this.getImageUrl(media);
      }
      this.imageUrlsResolved = true;
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