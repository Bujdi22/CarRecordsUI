<template>
  <ion-page>
    <ion-progress-bar v-if="loading || loadingUpdate" type="indeterminate"></ion-progress-bar>
    <header-toolbar :back-button-target="editing ? null : '/vehicles'">
      <span v-if="vehicle">
        {{ vehicle.displayName }}
      </span>
    </header-toolbar>
    <ion-content>
      <div v-if="fail" class="container">
        <h3>
          Sorry, vehicle not found
        </h3>
        <router-link to="/vehicles">
          <ion-button color="primary">Vehicles page</ion-button>
        </router-link>
      </div>
      <div v-else class="container p-b-50">
        <skeleton-card :inset="true" v-if="loading"></skeleton-card>
        <div v-else-if="vehicle && !editing">
          <ion-list :inset="true">
            <ion-item>
              <div style="display: flex; justify-content: space-between; width: 100%;" class="is-block-mobile">
                <div style="margin: 10px 10px 10px 0;" class="is-text-align-center-mobile">
                  <img v-if="logoPath" :src="logoPath" style="height:50px" alt="car brand logo"/>
                </div>
                <div class="buttons">
                  <ion-button class="m-r-10" color="danger" @click="destroy">
                    <ion-icon slot="start" :icon="trashOutline()"></ion-icon>
                    Delete
                  </ion-button>
                  <ion-button class="m-r-10" color="light" @click="edit">
                    <ion-icon slot="start" :icon="createOutline()"></ion-icon>
                    Edit
                  </ion-button>
                  <ion-button color="light" @click="downloadPDF">
                    <ion-icon slot="start" :icon="cloudDownloadOutline()"></ion-icon>
                    Export
                  </ion-button>

                </div>
              </div>
            </ion-item>
            <div class="ion-padding">
              <table class="table is-small">
                <tbody>
                <tr>
                  <th>Registration:</th>
                  <td>{{ vehicle.registration }}</td>
                </tr>  <tr>
                  <th>Make:</th>
                  <td>{{ vehicle.make }}</td>
                </tr>
                <tr>
                  <th>Model:</th>
                  <td>
                    {{ vehicle.model }}
                  </td>
                </tr>
                <tr>
                  <th>Year:</th>
                  <td>
                    {{ vehicle.year }}
                  </td>
                </tr>
                <tr>
                  <th>
                    Created:
                  </th>
                  <td>
                    {{ formatCreatedAt(vehicle.createdAt) }}
                  </td>
                </tr>
                <tr>
                  <th>
                    Updated:
                  </th>
                  <td>
                    {{ formatUpdatedAt(vehicle.updatedAt) }}
                  </td>
                </tr>
                </tbody>
              </table>
            </div>

            <ion-item>
              <ion-label>
                <audits-viewer
                    model-type="vehicle"
                    :model-id="vehicle.id"
                    :reloader="reloader"
                ></audits-viewer>
              </ion-label>
            </ion-item>
          </ion-list>
          <maintenance-records :vehicle="vehicle"></maintenance-records>
        </div>
        <div v-else-if="vehicle && editing && form">
          <ion-card color="light">
            <ion-card-header>
              <ion-card-title>
                <ion-icon :icon="informationCircleOutline()"></ion-icon>
                You are now editing this vehicle
              </ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <ion-button @click="cancelEdit">
                Cancel
              </ion-button>
            </ion-card-content>
          </ion-card>

          <form-error-list :errors="formErrors"></form-error-list>
          <ion-list>
            <ion-item>
              <ion-input v-model="form.displayName"
                         label="Display Name"
                         label-placement="stacked"
                         placeholder="Enter the display name of your vehicle">
              </ion-input>
            </ion-item>
            <ion-item>
              <ion-input v-model="form.registration"
                         label="Registration"
                         label-placement="stacked"
                         placeholder="Enter the registration">
              </ion-input>
            </ion-item>
            <custom-select
                v-model="form.make"
                :is-item="true"
                :options="carMakes"
            >
              Make
            </custom-select>
            <custom-select
                v-model="form.model"
                :is-item="true"
                :options="carModels"
            >
              Model
            </custom-select>
            <ion-item>
              <ion-input v-model="form.year"
                         type="number"
                         label="Year"
                         label-placement="stacked"
                         placeholder="Enter the year">
              </ion-input>
            </ion-item>

            <div style="padding:10px;">
              <ion-button expand="block" @click="save" :disabled="isSaveDisabled">
                Update
              </ion-button>
            </div>
          </ion-list>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import HeaderToolbar from "@/components/HeaderToolbar.vue";
import {
  IonContent,
  IonPage,
  IonProgressBar,
  onIonViewDidEnter,
  IonButton,
  IonItem,
  IonLabel,
  IonList,
  IonCardContent,
  IonSelect, IonSelectOption, IonInput, IonCardHeader, IonCard, IonCardTitle, IonCardSubtitle, IonIcon
} from "@ionic/vue";
import SkeletonCard from "@/components/SkeletonCard.vue";
import {Vehicle} from "@/interfaces/Vehicle";
import axiosInstance from "@/config/axiosConfig";
import Toast from "@/utils/toast";
import FormErrors from "@/mixins/FormErrors";
import FormErrorList from "@/components/FormErrorList.vue";
import {cloudDownloadOutline, createOutline, informationCircleOutline, trashOutline} from "ionicons/icons";
import Confirm from "@/utils/confirm";
import MaintenanceRecords from "@/components/MaintenanceRecords.vue";
import {formatCreatedAt, formatUpdatedAt} from "../utils/dateUtils";
import AuditsViewer from "@/components/AuditsViewer.vue";
import useCarlogos from "@/mixins/useCarlogos";
import {downloadFileFromServer} from "@/utils/fileDownloader";
import CustomSelect from "@/components/CustomSelect.vue";

export default defineComponent({
  name: "ViewVehiclePage",
  mixins: [FormErrors, useCarlogos],
  components: {
    CustomSelect,
    AuditsViewer,
    MaintenanceRecords,
    IonIcon,
    IonCardSubtitle, IonCardTitle, IonCard, IonCardHeader,
    FormErrorList,
    IonInput, IonSelectOption, IonSelect,
    SkeletonCard, IonProgressBar, IonPage, IonContent, HeaderToolbar, IonButton, IonItem, IonLabel, IonList,
    IonCardContent
  },
  data() {
    return {
      vehicle: null as Vehicle | null,
      loading: false,
      loadingUpdate: false,
      fail: false,
      editing: false,
      form: {} as Vehicle | null,
      reloader: 0,
      logoPath: null,
      carMakes: [] as string[],
      carModelsCache: {},
      carModels: [],
    }
  },
  created() {
    onIonViewDidEnter(() => {
      this.reloader++;
      this.form = null;
      this.editing = false;
      this.fail = false;
      this.loadingUpdate = false;
      this.load();
    });

    this.$axios.get('/api/car-makes').then(({data}) => {
      this.carMakes = data.map((make) => {
        return {label: make, value: make};
      });
    })
  },
  methods: {
    cloudDownloadOutline() {
      return cloudDownloadOutline
    },
    formatUpdatedAt,
    formatCreatedAt,
    trashOutline() {
      return trashOutline
    },
    createOutline() {
      return createOutline
    },
    informationCircleOutline() {
      return informationCircleOutline
    },
    load() {
      this.loading = true;
      this.fail = false;
      axiosInstance.get<Vehicle>(`/api/vehicles/${this.$route.params.id}`).then(({data}) => {
        this.vehicle = data;
        this.loading = false;
      }).catch((error) => {
        console.error("Failed to load vehicle", error);
        this.loading = false;
        this.fail = true;
      });
    },
    edit() {
      this.form = JSON.parse(JSON.stringify(this.vehicle));
      this.resetFormErrors();
      this.editing = true;
    },
    save() {
      this.resetFormErrors();
      this.loadingUpdate = true;
      axiosInstance.put<Vehicle>(`/api/vehicles/${this.$route.params.id}`, this.form).then(({data}) => {
        this.vehicle = data;
        this.editing = false;
        this.form = null;
        Toast.fire({
          icon: "success",
          title: "Updates saved",
        })
        this.loadingUpdate = false;
      }).catch((error) => {
        console.error("Could not update vehicle", error);
        this.loadingUpdate = false;
        this.parseFormErrors(error.response.data);
      })
    },
    cancelEdit() {
      this.editing = false;
      this.form = null;
    },
    destroy() {
      if (!this.vehicle) return;
      Confirm.fire({text: `You are going to delete vehicle ${this.vehicle.displayName}`}).then((result) => {
        if (result.isConfirmed) {
          axiosInstance.delete(`/api/vehicles/${this.$route.params.id}`).then(() => {
            Toast.fire({
              icon: "success",
              title: "Vehicle deleted",
            })
            this.$router.push('/vehicles');
          }).catch((error) => {
            console.error("Failed deleting vehicle", error);
            Toast.fire({
              icon: "error",
              title: "Something went wrong",
            })
          })
        }
      });
    },

    getModelOptions() {
      if (!this.form?.make) {
        this.carModels = [];
        return;
      }
      if (this.carModelsCache[this.form?.make]) {
        this.carModels = this.carModelsCache[this.form.make];
        return;
      }

      this.$axios.get(`/api/car-models?make=${this.form?.make}`).then(({data}) => {
        this.carModels = data.map((model) => {
          return { label: model, value: model };
        });
        this.carModelsCache[this.form?.make] = this.carModels;
      })
    },
    downloadPDF() {
      if (!this.vehicle) {
        return;
      }
      downloadFileFromServer(`/api/vehicles/export/${this.vehicle.id}`, this.vehicle.displayName + '.pdf');
    },
  },
  computed: {
    isSaveDisabled(): boolean {
      return !(this.form && this.form.displayName && this.form.make && this.form.model && this.form.year)
    }
  },
  watch: {
    async vehicle(v) {
      if (v?.make) {
        this.logoPath = await this.getLogo(v.make);
      }
    },
    'form.make'() {
      this.getModelOptions();
    },
  },
})
</script>

<style scoped>

</style>