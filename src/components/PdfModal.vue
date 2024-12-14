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
  <ion-content>
    <PDFViewer
        v-if="ready"
        :source="file.resolvedUrl"
        @download="download"
    >

    </PDFViewer>
  </ion-content>
  <ion-footer :translucent="true">
    <ion-toolbar>
      <ion-button color="light" slot="end" class="m-r-10" @click="download">
        <ion-icon slot="start" :icon="cloudDownloadOutline()"></ion-icon>
        Download</ion-button>
    </ion-toolbar>
  </ion-footer>
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
import {closeCircleOutline, cloudDownloadOutline} from "ionicons/icons";
import {downloadFile} from "@/utils/fileDownloader";
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
    cloudDownloadOutline() {
      return cloudDownloadOutline
    },
    closeCircleOutline() {
      return closeCircleOutline
    },
    close() {
      modalController.dismiss(null, 'confirm');
    },
    download() {
      downloadFile(this.file.resolvedUrl, `${this.file.id}.${this.file.fileType}`);
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