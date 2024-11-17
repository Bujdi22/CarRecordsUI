<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>PDF Viewer</ion-title>
      <ion-buttons slot="end">
        <ion-button @click="close">
          <ion-icon :icon="closeCircleOutline()" slot="icon-only"></ion-icon>
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
    <ion-progress-bar v-if="!ready" type="indeterminate"></ion-progress-bar>
  </ion-header>
  <ion-content class="ion-padding">

    <PDFViewer
        v-if="ready"
        :source="file.resolvedUrl"
        @download="handleDownload"
    >

    </PDFViewer>

  </ion-content>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue'
import PDFViewer from 'pdf-viewer-vue'
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  modalController,
  IonIcon, IonProgressBar,
} from '@ionic/vue';
import {Media} from "@/interfaces/Media";
import {closeCircleOutline} from "ionicons/icons";
export default defineComponent({
  name: "PdfModal",
  components: {
    IonProgressBar,
    IonIcon,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonButton,
    PDFViewer
  },
  props: {
    file: {required: true, type: Object as PropType<Media>},
  },
  data() {
    return {
      ready: false,
    }
  },
  methods: {
    closeCircleOutline() {
      return closeCircleOutline
    },
    close() {
      modalController.dismiss(null, 'confirm');
    },
    handleDownload() {

    }
  },
  mounted() {
    setTimeout(() => this.ready = true, 1000);
  }
})
</script>

<style scoped>
img {
  width: 100%;
  height: auto;
}
</style>