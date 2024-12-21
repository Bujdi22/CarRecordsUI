<template>
<div class="has-padding">
  <div v-if="!files.length">
      <h4>
        {{ notFoundMessage }}
      </h4>
  </div>
  <div v-if="imageUrlsResolved" class="is-grid-desktop">
    <ion-card v-for="(file) in files"
              :key="file.id"
              class="is-grid-item-desktop"
              :class="{'ion-activatable ripple-parent rounded-rectangle mouse-pointer': openOnClick}"
              @click="cardClicked(file)"
    >
      <ion-ripple-effect v-if="openOnClick"></ion-ripple-effect>
      <div v-if="file.fileType === 'pdf'" style="font-size: 70px; height: 150px;" class="m-t-50 has-text-center">
        <ion-icon :icon="documentTextOutline()"></ion-icon>
      </div>
      <div v-else class="image-container">
        <img :src="(file.resolvedUrl)" alt="test"/>
      </div>
      <ion-card-header>
        <ion-card-title>{{ formatDate(file.createdAt) }}</ion-card-title>
        <ion-card-subtitle>File Attached <span>({{ file.fileType }})</span></ion-card-subtitle>
      </ion-card-header>

      <ion-card-content>
        <ion-button v-if="canDelete"
                    color="danger"
                    @click="$emit('deleteFile', file)"
        >
          <ion-icon slot="start" :icon="trashOutline()"></ion-icon>
          Delete
        </ion-button>
        <ion-button color="primary"
                    @click.stop="view(file)"
        >
          <ion-icon slot="start" :icon="file.fileType === 'pdf' ? cloudDownloadOutline() : eyeOutline()"></ion-icon>
          <span v-if="file.fileType === 'pdf'">
            Download
          </span>
          <span v-else>
            View
          </span>
        </ion-button>
      </ion-card-content>
    </ion-card>

  </div>

</div>
</template>
<script lang="ts">
import {defineComponent, PropType} from "vue";
import {IonButton, IonIcon, IonRippleEffect, IonCardHeader, IonCardContent, IonCardTitle, IonCardSubtitle, IonCard} from "@ionic/vue";
import {formatDate} from "@/utils/dateUtils";
import axiosInstance from "@/config/axiosConfig";
import {cloudDownloadOutline, documentTextOutline, eyeOutline, trashOutline} from "ionicons/icons";
import {Media} from "@/interfaces/Media";
import { modalController } from '@ionic/vue';
import {downloadFile} from "@/utils/fileDownloader";
export default defineComponent({
  components: {IonIcon, IonButton, IonRippleEffect, IonCardHeader, IonCardContent, IonCardTitle, IonCardSubtitle, IonCard},
  name: "FileTable",
  props: {
    files: {
      required: true,
      type: Array as PropType<Media[]>,
    },
    canDelete: {required: false, default: false},
    title: {required: false, default: 'Files'},
    notFoundMessage: {required: false, default: 'No files found.'},
    openOnClick: {required: false, default: false},
  },
  data() {
    return {
      imageUrlsResolved: false,
    }
  },
  mounted() {
    this.resolveImages();
  },
  methods: {
    cloudDownloadOutline() {
      return cloudDownloadOutline
    },
    formatDate,
    documentTextOutline() {
      return documentTextOutline
    },
    eyeOutline() {
      return eyeOutline
    },
    trashOutline() {
      return trashOutline
    },
    async getImageUrl(media: Media) {
      const response = await axiosInstance.get(`/api/file/download/${media.id}`, {responseType: 'blob'});
      media.resolvedUrl = URL.createObjectURL(response.data);
    },
    async resolveImages() {
      this.imageUrlsResolved = false

      for (const media of this.files) {
        await this.getImageUrl(media);
      }
      this.imageUrlsResolved = true;
    },
    async view(file: Media) {
      if (file.fileType === 'pdf') {
        downloadFile(file.resolvedUrl, `${file.id}.pdf`);
      } else {
        const component = (await import('@/components/ImageModal.vue')).default;
        const modal = await modalController.create({
          component: component,
          cssClass: 'fullscreen',
          componentProps: {file}
        });

        modal.present();
      }

    },
    cardClicked(file: Media) {
      if (this.openOnClick) {
        this.view(file);
      }
    },
  },
  watch: {
    files() {
      this.resolveImages();
    }
  }
})
</script>

<style scoped>
.image-container {
  height: 200px;
  text-align: center;
  padding-top: 20px;

}
.image-container img {
  height: 100%;
  border-radius: 20px;
}
</style>