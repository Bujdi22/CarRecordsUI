<template>
  <ion-page>
    <ion-progress-bar v-if="loading" type="indeterminate"></ion-progress-bar>
    <header-toolbar :has-back-button="true">
      <span v-if="vehicle">
        <span v-if="isEdit">
          Edit
        </span>
        <span v-else>
          Add
        </span>
        record for {{ vehicle.displayName }}
      </span>
    </header-toolbar>
    <ion-content ref="maintenance-content">
      <div class="container">
        <ion-card color="light" v-if="isEdit && form?.createdAt">
          <ion-card-header>
            <div class="icon-title">
              <ion-icon :icon="informationCircleOutline()"></ion-icon>
              <ion-card-title>
                You are now editing a record.
              </ion-card-title>
            </div>
            <ion-card-subtitle>This record was first added on {{ formatDate(form.createdAt) }}</ion-card-subtitle>
          </ion-card-header>
          <ion-card-content>
            <ion-button @click="cancelEdit">
              Cancel
            </ion-button>
          </ion-card-content>
        </ion-card>

        <div v-if="fail" class="container">
          <h3>
            Sorry, vehicle not found
          </h3>
          <router-link to="/vehicles">
            <ion-button color="primary">Vehicles page</ion-button>
          </router-link>
        </div>
        <div v-else-if="form">
          <form-error-list :errors="formErrors"></form-error-list>
          <ion-list>
            <ion-item>
              <ion-input v-model="form.title"
                         label="Title"
                         label-placement="stacked"
                         placeholder="Enter the title of your record">
              </ion-input>
            </ion-item>
            <ion-item>
              <div>
                <p class="item-heading">Date Carried Out</p>
                <p class="item-value">
                  {{ formatDate(form.date) }}
                </p>
                <Datepicker
                    style="margin:10px 0;"
                    v-model="form.date"
                    :inline="true"
                    :time-picker="false"
                    :auto-apply="true"
                    :enable-time-picker="false"
                    :dark="isDarkMode"
                ></Datepicker>
              </div>
            </ion-item>
          </ion-list>
          <ion-list style="margin-top:20px; margin-bottom: 20px">
            <h5 class="has-padding" style="margin:0">Serviced Items</h5>
            <template v-if="form.description?.items">
              <ion-item v-for="(item, i) in form.description.items" :key="i">
                <ion-input v-model="form.description.items[i]"
                           :label="`Item ${i + 1}:`"
                           label-placement="stacked"
                           placeholder="Enter what was serviced">
                  <ion-button size="small" slot="end" color="medium" style="margin-right: 15px;" @click="remove(i)">
                    <ion-icon slot="icon-only" size="small" :icon="trashOutline()"></ion-icon>
                  </ion-button>
                </ion-input>
              </ion-item>
            </template>
            <ion-button @click="addMore" class="has-padding" shape="round" color="primary">
              <ion-icon slot="start" :icon="addOutline()"></ion-icon>
              Add item
            </ion-button>
          </ion-list>

          <ion-list style="margin-top:20px; margin-bottom: 20px">
            <h5 class="has-padding" style="margin:0">Files</h5>
            <div v-if="stagedForDelete.length" style="padding: 20px;">
              <ion-icon :icon="warningOutline()" color="danger"></ion-icon>
              You selected {{ stagedForDelete.length }} file(s) for deletion. After submitting, this cannot be undone.
              <br>
              <ion-button color="light" @click="stagedForDelete = []">
                Undo delete
              </ion-button>
            </div>
            <file-table
                v-if="currentFilesExist && filteredFiles.length"
                title="Current files"
                :can-delete="true"
                :files="filteredFiles"
                @deleteFile="(file) => stageForDelete(file)"
                style="padding-left: 20px; padding-right: 20px;"
            ></file-table>
            <ion-item v-if="files.length">
              <h3>New Files</h3>
            </ion-item>

            <ion-item v-for="(file, i) in files" :key="i">
              {{ file.name }}
            </ion-item>
            <input
                type="file"
                style="display: none"
                ref="fileInput"
                accept="image/*"
                @change="onFilePicked"/>
            <ion-button @click="pickFile" class="has-padding" shape="round" color="primary">
              <ion-icon slot="start" :icon="attachOutline()"></ion-icon>
              Add File
            </ion-button>
          </ion-list>
          <div style="text-align: right">
            <ion-button style="margin-bottom: 20px;" color="primary" @click="submit">
              Submit
            </ion-button>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {mapState} from "vuex";
import {Vehicle} from "@/interfaces/Vehicle";
import {
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonPage,
  IonProgressBar,
  onIonViewDidEnter,
  IonList,
  IonIcon,
  IonCardContent, IonCardHeader, IonCardTitle, IonCard, IonCardSubtitle
} from "@ionic/vue";
import HeaderToolbar from "@/components/HeaderToolbar.vue";
import {MaintenanceRecord} from "@/interfaces/MaintenanceRecord";
import FormErrorList from "@/components/FormErrorList.vue";
import FormErrors from "@/mixins/FormErrors";
import axiosInstance from "@/config/axiosConfig";
import moment from "moment/moment";
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import {formatDate} from "../utils/dateUtils";
import {addOutline, attachOutline, informationCircleOutline, trashOutline, warningOutline} from "ionicons/icons";
import Toast from "@/utils/toast";
import FileTable from "@/components/FileTable.vue";
import {Media} from "@/interfaces/Media";

export default defineComponent({
  name: "CreateMaintenanceRecordPage",
  components: {
    FileTable,
    IonCardSubtitle,
    IonCard,
    IonCardTitle,
    IonCardHeader,
    IonCardContent,
    IonButton,
    IonInput,
    IonItem,
    FormErrorList,
    IonContent,
    IonPage,
    HeaderToolbar,
    IonProgressBar,
    IonList,
    Datepicker,
    IonIcon
  },
  mixins: [FormErrors],
  data() {
    return {
      loading: true,
      form: {} as MaintenanceRecord,
      vehicle: null as Vehicle | null,
      fail: false,
      isEdit: false,
      files: [],
      stagedForDelete: [],
    }
  },
  created() {
    onIonViewDidEnter(() => {
      this.init();
    });
    this.init();
  },

  methods: {
    init() {
      this.fail = false;
      this.loading = true;
      this.isEdit = false;
      this.form = {
        vehicleId: this.$route.params.vehicleId,
        title: '',
        description: {items: ['']},
        date: moment().format('YYYY-MM-DD'),
      }
      this.files = [];
      this.stagedForDelete = [];
      if (this.$route.params.recordId) {
        this.isEdit = true;
        axiosInstance.get<MaintenanceRecord>(`/api/maintenance-records/single-record/${this.$route.params.recordId}`)
            .then(({data}) => {
              this.getVehicle(data.vehicleId);
              this.form = data;
            })
      } else {
        this.getVehicle(this.$route.params.vehicleId);
      }
    },
    getVehicle(vehicleId: string) {
      if (this.cachedVehicle && this.cachedVehicle.id === vehicleId) {
        this.vehicle = this.cachedVehicle;
        this.loading = false;
      } else {
        axiosInstance.get<Vehicle>(`/api/vehicles/${vehicleId}`).then(({data}) => {
          this.vehicle = data;
        }).catch((error) => {
          console.error("Failed to load vehicle", error);
          this.fail = true;
        }).finally(() => {
          this.loading = false;
        })
      }
    },
    warningOutline() {
      return warningOutline
    },
    attachOutline() {
      return attachOutline
    },
    informationCircleOutline() {
      return informationCircleOutline
    },
    addOutline() {
      return addOutline
    },
    trashOutline() {
      return trashOutline
    },
    formatDate,
    addMore() {
      this.form.description.items.push('');
    },
    remove(i: number) {
      this.form.description.items = [
        ...this.form.description.items.slice(0, i),
        ...this.form.description.items.slice(i + 1)
      ];
    },
    submit() {
      this.resetFormErrors();
      this.loading = true;
      let request;
      if (this.isEdit) {
        this.form.deleteFiles = this.stagedForDelete;
        request = axiosInstance.put(`/api/maintenance-records/${this.form.id}`, this.form)
      } else {
        request = axiosInstance.post('/api/maintenance-records', this.form);
      }
      request.then(({data}) => {
        if (this.files.length) {
          this.handleFiles(data);
        } else {
          this.redirect();
        }
      }).catch((error) => {
        console.error("Could not save", error);
        this.loading = false;
        this.parseFormErrors(error.response.data);
        this.$refs["maintenance-content"].$el.scrollToTop(500);
      })
    },
    cancelEdit() {
      this.$router.push({path: `/vehicles/${this.vehicle.id}`})
    },
    onFilePicked(event: Event) {
      const files = event.target.files
      const file = files[0];
      const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];

      if (file) {
        if (!allowedTypes.includes(file.type)) {
          alert('Only JPG, PNG, or PDF files are allowed.');
          return;
        }

        const maxSizeInMB = 10;
        const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

        if (file.size > maxSizeInBytes) {
          // Handle file rejection
          alert(`File size exceeds ${maxSizeInMB} MB. Please upload a smaller file.`);
          return; // Exit the function without adding the file
        }

        this.files.push(file);
      }
    },
    async handleFiles(record: MaintenanceRecord) {
      for (const file of this.files) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('modelType', 'maintenance_record');
        formData.append('modelId', record.id);
        await axiosInstance.post('/api/file/upload', formData, {
          headers: {'Content-Type': 'multipart/form-data'},
        });
      }

      this.redirect();
    },
    redirect() {
      Toast.fire({'icon': 'success', title: 'Record saved'});
      this.loading = false;
      this.$router.push({path: `/vehicles/${this.vehicle.id}`});
    },
    pickFile() {
      this.$refs.fileInput.click()
    },
    stageForDelete(file: Media) {
      this.stagedForDelete.push(file.id);
    },
  },

  computed: {
    ...mapState({
      cachedVehicle: state => state.cachedVehicle as Vehicle
    }),

    isDarkMode() {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    },

    currentFilesExist() {
      return this.form.media && this.form.media.length;
    },

    filteredFiles() {
      if (this.currentFilesExist) {
        return this.form.media.filter((file) => !this.stagedForDelete.includes(file.id));
      }
      return [];
    },
  },
})
</script>

<style scoped>

</style>