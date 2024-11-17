<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>Image Viewer</ion-title>
      <ion-buttons slot="end">
        <ion-button @click="close">
          <ion-icon :icon="closeCircleOutline()" slot="icon-only"></ion-icon>
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <ion-item>
      <img :src="file.resolvedImageUrl" alt="image"/>
    </ion-item>
  </ion-content>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue'
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  IonItem,
  modalController, IonIcon,
} from '@ionic/vue';
import {Media} from "@/interfaces/Media";
import {closeCircleOutline} from "ionicons/icons";
export default defineComponent({
  name: "ImageModal",
  components: {
    IonIcon,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonButton,
    IonItem,
  },
  props: {
    file: {required: true, type: Object as PropType<Media>},
  },
  methods: {
    closeCircleOutline() {
      return closeCircleOutline
    },
    close() {
      modalController.dismiss(null, 'confirm');
    },
  },
})
</script>

<style scoped>
img {
  width: 100%;
  height: auto;
}
</style>