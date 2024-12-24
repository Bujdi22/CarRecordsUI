<template>
  <ion-page>

    <header-toolbar :has-back-button="true">Add Vehicle</header-toolbar>
    <ion-content>
      <div class="container mobile-bottom-padded">
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
            <ion-input v-model="registration"
                       label="Registration"
                       label-placement="stacked"
                       placeholder="Enter the registration">
            </ion-input>
          </ion-item>
          <custom-select
              v-model="make"
              :is-item="true"
              :options="carMakes"
          >
            Make
          </custom-select>
          <custom-select
              v-model="model"
              :is-item="true"
              :options="carModels"
          >
            Model
          </custom-select>
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
<script lang="ts">
import {
  IonPage,
  IonButton,
  IonContent,
  IonList,
  IonItem,
  IonInput,
} from "@ionic/vue";
import HeaderToolbar from "@/components/HeaderToolbar.vue";
import FormErrorList from "@/components/FormErrorList.vue";
import {defineComponent} from "vue";
import FormErrors from '../mixins/FormErrors';
import CustomSelect from "@/components/CustomSelect.vue";

export default defineComponent({
  name: "AddVehiclePage",
  components: {
    CustomSelect,
    IonPage,
    IonButton,
    IonContent,
    IonList,
    IonItem,
    IonInput,
    HeaderToolbar,
    FormErrorList
  },
  mixins: [FormErrors],
  data() {
    return {
      displayName: '',
      make: '',
      model: '',
      year: '',
      registration: '',
      carMakes: [] as string[],
      carModelsCache: {},
      carModels: [],
    }
  },
  mounted() {
    this.displayName = '';
    this.make = '';
    this.model = '';
    this.year = '';
    this.registration = '';
    this.$axios.get('/api/car-makes').then(({data}) => {
      this.carMakes = data.map((make) => {
        return {label: make, value: make};
      });
    })
  },
  methods: {
    add() {
      this.resetFormErrors();
      const form = {
        displayName: this.displayName,
        registration: this.registration,
        make: this.make,
        model: this.model,
        year: this.year
      };
      this.$axios.post('/api/vehicles', form)
          .then(() => {
            this.$router.push('/vehicles');
          }).catch((error) => {
            this.parseFormErrors(error.response.data);
      })
    },
    getModelOptions() {
      if (!this.make) {
        this.carModels = [];
        this.model = '';
        return;
      }
      if (this.carModelsCache[this.make]) {
        this.carModels = this.carModelsCache[this.make];
        return;
      }

      this.$axios.get(`/api/car-models?make=${this.make}`).then(({data}) => {
        this.carModels = data.map((model) => {
          return { label: model, value: model };
        });
        this.carModelsCache[this.make] = this.carModels;
      })
    },
  },
  computed: {
    isDisabled() {
      return !this.displayName || !this.make || !this.model || !this.year;
    },
  },
  watch: {
    make() {
      this.getModelOptions();
    },
  }
})
</script>
<style scoped>

</style>