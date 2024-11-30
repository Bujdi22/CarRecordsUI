<template>
  <ion-page>
    <ion-progress-bar v-if="loading" type="indeterminate"></ion-progress-bar>
    <header-toolbar :back-button-target="record ? `/vehicles/${record.vehicleId}` : ''">
      <span v-if="record">
        {{ record.title }}
      </span>
    </header-toolbar>
    <ion-content>
      <div class="container">
        <div v-if="fail">
          <h3>
            Sorry, record not found
          </h3>
          <router-link to="/vehicles">
            <ion-button color="primary">Vehicles page</ion-button>
          </router-link>
        </div>
        <div v-else-if="record">
          <ion-list>
            <ion-item>

              <div style="display: flex; justify-content: space-between; width: 100%;">
                <div>
                  <p class="item-heading is-color-primary">Title</p>
                  <p class="item-value">{{ record.title }}</p>
                </div>
                <div>
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
                </div>
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
          <ion-list v-if="record.description">
            <ion-item v-for="(item, key) in record.description.items" :key="key">
              <ion-icon :icon="checkmarkOutline()" color="primary"></ion-icon>
              <p class="is-color-base" style="margin-left: 20px;">{{ item }}</p>
            </ion-item>
          </ion-list>
          <file-table
              v-if="record.media"
              :files="record.media"
              style="margin-top: 20px;"
              @deleteFile="(file) => deleteFile(file)"
          ></file-table>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {
  IonButton,
  IonContent,
  IonIcon,
  IonItem,
  IonList,
  IonPage,
  IonProgressBar,
  onIonViewDidEnter
} from "@ionic/vue";
import HeaderToolbar from "@/components/HeaderToolbar.vue";
import {MaintenanceRecord} from "@/interfaces/MaintenanceRecord";
import {mapState} from "vuex";
import axiosInstance from "@/config/axiosConfig";
import {formatCreatedAt, formatDate} from "@/utils/dateUtils";
import {checkmarkOutline, createOutline, eyeOutline, trashOutline} from "ionicons/icons";
import Confirm from "@/utils/confirm";
import Toast from "@/utils/toast";
import FileTable from "@/components/FileTable.vue";

export default defineComponent({
  name: "ViewMaintenanceRecord",
  components: {FileTable, IonIcon, IonItem, IonList, IonButton, IonContent, HeaderToolbar, IonPage, IonProgressBar},
  data() {
    return {
      record: {} as MaintenanceRecord | null,
      loading: false,
      fail: false,
    }
  },
  mounted() {
    onIonViewDidEnter(() => {
      this.load();
    });
    this.load();
  },
  methods: {
    eyeOutline() {
      return eyeOutline
    },
    formatCreatedAt,
    createOutline() {
      return createOutline
    },
    trashOutline() {
      return trashOutline
    },
    checkmarkOutline() {
      return checkmarkOutline
    },
    formatDate,
    load() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      this.record = null;
      this.fail = false;
      if (this.cachedRecord && this.cachedRecord.id == this.$route.params.recordId) {
        this.record = this.cachedRecord;
        this.loading = false;
      } else {
        axiosInstance.get<MaintenanceRecord>(`/api/maintenance-records/single-record/${this.$route.params.recordId}`)
            .then(({data}) => {
              this.record = data;
              this.loading = false;
            })
            .catch((error) => {
              console.error("Failed to load record", error);
              this.loading = false;
              this.fail = true;
            });
      }
    },
    edit() {
      this.$router.push({path: `/vehicles/edit-maintenance-record/${this.record.vehicleId}/${this.record.id}`})
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
                this.$router.push({path: `/vehicles/${this.record.vehicleId}`});
              })
              .catch((error) => {
                console.error(error);
                Toast.fire({icon: 'error', title: 'Something went wrong'});
              })
        }
      });
    },
    deleteFile(file) {
      file;
      alert('Todo implement');
    },
  },
  computed: {
    ...mapState({
      cachedRecord: state => state.cachedRecord as MaintenanceRecord
    }),
  }
})
</script>

<style scoped>

</style>