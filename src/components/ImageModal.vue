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
  <ion-content>
    <div class="viewer">
      <div class="image-container" ref="imageContainer">
        <img
            :src="file.resolvedUrl"
            alt="image"
            ref="image"
            @wheel="zoom"
            @touchstart="onTouchStart"
            @touchmove="onTouchMove"
            style="transform: scale(1);"
        />
      </div>
    </div>
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
import {defineComponent, PropType} from 'vue';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  modalController,
  IonIcon,
} from '@ionic/vue';
import {Media} from "@/interfaces/Media";
import {closeCircleOutline, cloudDownloadOutline} from "ionicons/icons";
import {downloadFile} from '@/utils/fileDownloader';

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
  },
  props: {
    file: {required: true, type: Object as PropType<Media>},
  },
  data() {
    return {
      scale: 1,
      startDistance: 0,
    };
  },
  methods: {
    cloudDownloadOutline() {
      return cloudDownloadOutline
    },
    closeCircleOutline() {
      return closeCircleOutline;
    },
    close() {
      modalController.dismiss(null, 'confirm');
    },
    zoom(event: WheelEvent) {
      event.preventDefault();
      this.scale += event.deltaY > 0 ? -0.1 : 0.1;
      this.scale = Math.max(this.scale, 0.5); // Prevent too small
      this.scale = Math.min(this.scale, 3);   // Prevent too large
      (this.$refs.image as HTMLImageElement).style.transform = `scale(${this.scale})`;
    },
    onTouchStart(event: TouchEvent) {
      if (event.touches.length === 2) {
        const [touch1, touch2] = event.touches;
        this.startDistance = Math.hypot(
            touch2.pageX - touch1.pageX,
            touch2.pageY - touch1.pageY
        );
      }
    },
    onTouchMove(event: TouchEvent) {
      if (event.touches.length === 2) {
        const [touch1, touch2] = event.touches;
        const currentDistance = Math.hypot(
            touch2.pageX - touch1.pageX,
            touch2.pageY - touch1.pageY
        );
        const scaleChange = currentDistance / this.startDistance;
        this.scale = Math.min(Math.max(this.scale * scaleChange, 0.5), 3);
        (this.$refs.image as HTMLImageElement).style.transform = `scale(${this.scale})`;
        this.startDistance = currentDistance; // Update for next move
      }
    },
    download() {
      downloadFile(this.file.resolvedUrl, `${this.file.id}.${this.file.fileType}`);
    }
  },
});
</script>

<style scoped>
.viewer {
  height: 100%;
}
.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.image-container img {
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
  touch-action: none;
  pointer-events: all;
  transition: transform 0.3s ease;
}
</style>