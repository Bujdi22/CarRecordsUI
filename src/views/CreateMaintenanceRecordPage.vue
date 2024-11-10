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
            <ion-item v-if="form.description" v-for="(item, i) in form.description.items" :key="i">
              <ion-input v-model="form.description.items[i]"
                         :label="`Item ${i + 1}:`"
                         label-placement="stacked"
                         placeholder="Enter what was serviced">
                <ion-button size="small" slot="end" color="medium" style="margin-right: 15px;" @click="remove(i)">
                  <ion-icon slot="icon-only" size="small" :icon="trashOutline()"></ion-icon>
                </ion-button>
              </ion-input>
            </ion-item>
            <ion-button @click="addMore" class="has-padding" shape="round" color="primary">
              <ion-icon slot="start" :icon="addOutline()"></ion-icon>
              Add item
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
import {addOutline, informationCircleOutline, trashOutline} from "ionicons/icons";
import Toast from "@/utils/toast";

export default defineComponent({
  name: "CreateMaintenanceRecordPage",
  components: {
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
      loading: false,
      form: {} as MaintenanceRecord | null,
      vehicle: null as Vehicle | null,
      fail: false,
      isEdit: false,
    }
  },
  created() {
    onIonViewDidEnter(() => {
      this.fail = this.loading = this.isEdit = false;
      this.form = {
        vehicleId: this.$route.params.vehicleId,
        title: '',
        description: {items: ['']},
        date: moment().format('YYYY-MM-DD'),
      }
      if (this.cachedVehicle && this.cachedVehicle === this.$route.params.vehicleId) {
        this.vehicle = this.cachedVehicle;
      } else {
        this.loading = true;
        axiosInstance.get<Vehicle>(`/api/vehicles/${this.$route.params.vehicleId}`).then(({data}) => {
          this.vehicle = data;
          if (this.$route.params.recordId) {
            this.isEdit = true;
            axiosInstance.get<MaintenanceRecord>(`/api/maintenance-records/single-record/${this.$route.params.recordId}`)
                .then(({data}) => {
                  this.form = data;
                  this.loading = false;
                })
          } else {
            this.loading = false;
            this.isEdit = false
          }
        }).catch((error) => {
          console.error("Failed to load vehicle", error);
          this.loading = false;
          this.fail = true;
        });
      }
    });
  },

  methods: {
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
    remove(i) {
      this.form.description.items = [
        ...this.form.description.items.slice(0, i),
        ...this.form.description.items.slice(i + 1)
      ];
    },
    submit() {
      this.resetFormErrors();
      this.loading = true;
      const request = this.isEdit
          ? axiosInstance.put(`/api/maintenance-records/${this.form.id}`, this.form)
          : axiosInstance.post('/api/maintenance-records', this.form);
      request.then(() => {
        Toast.fire({'icon': 'success', title: 'Record saved'});
        this.form = null;
        this.loading = false;
        this.$router.push({path: `/vehicles/${this.vehicle.id}`});
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
  },

  computed: {
    ...mapState({
      cachedVehicle: state => state.cachedVehicle as Vehicle
    }),

    isDarkMode() {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
  },
})
</script>

<style scoped>

</style>