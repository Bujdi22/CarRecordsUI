<template>
  <ion-page>

    <header-toolbar :has-back-button="true">Add Vehicle</header-toolbar>
    <ion-content>
      <div class="container">
        <form-error-list :errors="formErrors"></form-error-list>

        <ion-list>
          <ion-item>
            <ion-input v-model="displayName"
                       label="Display Name"
                       label-placement="stacked"
                       placeholder="Enter the display name of your vehicle">
            </ion-input>
          </ion-item>
          <ion-item>
            <ion-select
                v-model="make"
                label="Make"
                label-placement="stacked"
                placeholder="Enter the make"
            >
              <ion-select-option v-for="(make, key) in carmakes.brands" :value="make" :key="key">{{ make }}</ion-select-option>
            </ion-select>
          </ion-item>
          <ion-item>
            <ion-input v-model="model"
                       label="Model"
                       label-placement="stacked"
                       placeholder="Enter the model">
            </ion-input>
          </ion-item>
          <ion-item>
            <ion-input v-model="year"
                       type="number"
                       label="Year"
                       label-placement="stacked"
                       placeholder="Enter the year">
            </ion-input>
          </ion-item>

          <div style="padding:10px;">
            <ion-button expand="block" @click="add" :disabled="isDisabled">
              Add
            </ion-button>
          </div>
        </ion-list>

      </div>
    </ion-content>
  </ion-page>
</template>
<script setup lang="ts">
import {
  IonPage,
  IonIcon,
  IonButton,
  IonContent,
  IonList,
  IonItem,
  IonInput,
  IonSelect,
  IonSelectOption,
} from "@ionic/vue";
import HeaderToolbar from "@/components/HeaderToolbar.vue";
import FormErrorList from "@/components/FormErrorList.vue";
import carmakes from "@/assets/carmakers.json";
</script>
<script lang="ts">

import {defineComponent} from "vue";
import axiosInstance from '@/config/axiosConfig';
import FormErrors from '../mixins/FormErrors';

export default defineComponent({
  name: "AddVehiclePage",
  mixins: [FormErrors],
  data() {
    return {
      displayName: '',
      make: '',
      model: '',
      year: '',
    }
  },
  mounted() {
    this.displayName = '';
    this.make = '';
    this.model = '';
    this.year = '';
  },
  methods: {
    add() {
      this.resetFormErrors();
      const form = {
        displayName: this.displayName,
        make: this.make,
        model: this.model,
        year: this.year
      };
      axiosInstance.post('/api/vehicles', form)
          .then(() => {
            this.$router.push('/vehicles');
          }).catch((error) => {
            this.parseFormErrors(error.response.data);
      })
    },
  },
  computed: {
    isDisabled() {
      return !this.displayName || !this.make || !this.model || !this.year;
    },
  }
})
</script>
<style scoped>

</style>