<template>
<div class="has-background has-padding">
  <div v-if="!files.length">
      <h4>
        {{ notFoundMessage }}
      </h4>
  </div>
  <table class="formatted-table" v-else-if="imageUrlsResolved" id="galleryId">
    <thead>
    <tr>
      <th style="width: 150px">{{ title }}</th>
      <th>Uploaded</th>
      <th></th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(file) in files" :key="file.id">
      <th>
        <div v-if="file.fileType === 'pdf'" style="font-size: 70px">
          <ion-icon :icon="documentTextOutline()"></ion-icon>
        </div>
        <img v-else :src="(file.resolvedUrl)" alt="test"/>
      </th>
      <th>
        {{ formatCreatedAt(file.createdAt) }}
      </th>
      <th style="text-align: right">
        <ion-button v-if="canDelete"
           color="danger"
           class="has-padding"
           @click="$emit('deleteFile', file)"
        >
          <ion-icon slot="start" :icon="trashOutline()"></ion-icon>
          Delete
        </ion-button>
        <ion-button color="primary"
                    class="has-padding"
                    @click="view(file)"
        >
          <ion-icon slot="start" :icon="eyeOutline()"></ion-icon>
          View
        </ion-button>
      </th>
    </tr>
    </tbody>
  </table>

</div>
</template>
<script lang="ts">
import {defineComponent, PropType} from "vue";
import {IonButton, IonIcon} from "@ionic/vue";
import {formatCreatedAt} from "@/utils/dateUtils";
import axiosInstance from "@/config/axiosConfig";
import {documentTextOutline, eyeOutline, trashOutline} from "ionicons/icons";
import {Media} from "@/interfaces/Media";
import { modalController } from '@ionic/vue';
export default defineComponent({
  components: {IonIcon, IonButton},
  name: "FileTable",
  props: {
    files: {
      required: true,
      type: Array as PropType<Media[]>,
    },
    canDelete: {required: false, default: false},
    title: {required: false, default: 'Files'},
    notFoundMessage: {required: false, default: 'No files found.'},
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
    documentTextOutline() {
      return documentTextOutline
    },
    eyeOutline() {
      return eyeOutline
    },
    trashOutline() {
      return trashOutline
    },
    formatCreatedAt,
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
      const component = file.fileType === 'pdf'
          ? (await import('@/components/PdfModal.vue')).default
          : (await import('@/components/ImageModal.vue')).default;
      const modal = await modalController.create({
        component: component,
        cssClass: 'fullscreen',
        componentProps: {file}
      });

      modal.present();
    },
  },
  watch: {
    files() {
      this.resolveImages();
    }
  }
})
</script>