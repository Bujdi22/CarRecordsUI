<template>
  <ion-page>
    <ion-progress-bar v-if="loading || loadingUpdate" type="indeterminate"></ion-progress-bar>
    <header-toolbar :has-back-button="true">
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
      <div v-else class="container">
        <skeleton-card :inset="true" v-if="loading"></skeleton-card>
        <div v-else-if="vehicle && !editing">
          <ion-list :inset="true">
            <ion-item>
              <div style="display: flex; justify-content: space-between; width: 100%;">
                <div style="margin: 10px 10px 10px 0;">
                  <img v-if="logoPath" :src="logoPath" style="height:50px" alt="car brand logo"/>
                </div>
                <div class="buttons">
                  <ion-button color="primary" @click="edit">
                    <ion-icon slot="start" :icon="createOutline()"></ion-icon>
                    Edit
                  </ion-button>
                  <ion-button color="danger" @click="destroy" style="margin-left: 10px;">
                    <ion-icon slot="start" :icon="trashOutline()"></ion-icon>
                    Delete
                  </ion-button>
                </div>
              </div>
            </ion-item>
            <ion-item>
              <ion-label>
                Make: {{ vehicle.make }}
              </ion-label>
            </ion-item>
            <ion-item>
              <ion-label>
                Model: {{ vehicle.model }}
              </ion-label>
            </ion-item>
            <ion-item>
              <ion-label>
                Year:
                {{ vehicle.year }}
              </ion-label>
            </ion-item>
            <ion-item>
              <ion-label>
                Created:
                {{ formatCreatedAt(vehicle.createdAt) }}
              </ion-label>
            </ion-item>
            <ion-item>
              <ion-label>
                Last update:
                {{ formatUpdatedAt(vehicle.updatedAt) }}
              </ion-label>
            </ion-item>
          </ion-list>
          <maintenance-records :vehicle="vehicle"></maintenance-records>
        </div>
        <div v-else-if="vehicle && editing && form">
          <ion-card color="light">
            <ion-card-header>
              <div class="icon-title">
                <ion-icon :icon="informationCircleOutline()"></ion-icon>
                <ion-card-title>
                  You are now editing this vehicle
                </ion-card-title>
              </div>
              <ion-card-subtitle>Please make your changes in the form below.</ion-card-subtitle>
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
              <ion-select
                  v-model="form.make"
                  label="Make"
                  label-placement="stacked"
                  placeholder="Enter the make"
              >
                <ion-select-option v-for="(make, key) in carmakers.brands" :value="make.name" :key="key">{{
                    make.name
                  }}
                </ion-select-option>
              </ion-select>
            </ion-item>
            <ion-item>
              <ion-input v-model="form.model"
                         label="Model"
                         label-placement="stacked"
                         placeholder="Enter the model">
              </ion-input>
            </ion-item>
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
import carmakers from "@/assets/carmakers.json";
import {Vehicle} from "@/interfaces/Vehicle";
import axiosInstance from "@/config/axiosConfig";
import Toast from "@/utils/toast";
import FormErrors from "@/mixins/FormErrors";
import FormErrorList from "@/components/FormErrorList.vue";
import {createOutline, informationCircleOutline, trashOutline} from "ionicons/icons";
import Confirm from "@/utils/confirm";
import MaintenanceRecords from "@/components/MaintenanceRecords.vue";
import {formatCreatedAt, formatUpdatedAt} from "../utils/dateUtils";

export default defineComponent({
  name: "ViewVehiclePage",
  mixins: [FormErrors],
  components: {
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
      carmakers: carmakers,
      editing: false,
      form: {} as Vehicle | null,
    }
  },
  created() {
    onIonViewDidEnter(() => {
      this.form = null;
      this.editing = false;
      this.fail = false;
      this.loadingUpdate = false;
      this.load();
    });
  },
  methods: {
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
  },
  computed: {
    logoPath(): string {
      return this.vehicle
          ? this.carmakers.brands.find((brand) => this.vehicle!.make === brand.name)?.path || ''
          : '';
    },
    isSaveDisabled(): boolean {
      return !(this.form && this.form.displayName && this.form.make && this.form.model && this.form.year)
    }
  }
})
</script>

<style scoped>

</style>