<template>
  <ion-page>
    <ion-progress-bar v-if="loading" type="indeterminate"></ion-progress-bar>

    <header-toolbar>Register</header-toolbar>
    <ion-content>

      <div class="container">

        <form-error-list :errors="formErrors"></form-error-list>

        <ion-list>
          <ion-item>
            <ion-input v-model="username" label="Email" label-placement="stacked" placeholder="Type your email">
              <ion-icon slot="end" :icon="personCircleOutline" size="medium" aria-hidden="true"></ion-icon>
            </ion-input>
          </ion-item>
          <ion-item>
            <ion-input v-model="displayName"
                       label="Display Name"
                       label-placement="stacked"
                       placeholder="Type your display name">
            </ion-input>
          </ion-item>
          <ion-item>
            <ion-input
                v-model="password"
                label="Password"
                label-placement="stacked"
                type="password"
                placeholder="Type your password"

            >
              <ion-icon slot="end" :icon="lockClosedOutline" size="medium" aria-hidden="true"></ion-icon>
            </ion-input>
          </ion-item>
          <ion-item>
            <ion-input v-model="password2" label="Repeat Password" label-placement="stacked" type="password"
                       placeholder="Type your password again">
              <ion-icon slot="end" :icon="lockClosedOutline" size="medium" aria-hidden="true"></ion-icon>
            </ion-input>
          </ion-item>
          <ion-label v-if="!matchingPassword" color="danger" class="validation">Passwords do not match</ion-label>


          <div style="padding:10px;">
            <ion-button expand="block" @click="register" :disabled="isDisabled">
              Register
            </ion-button>
          </div>


        </ion-list>

      </div>
    </ion-content>
  </ion-page>
</template>
<script setup lang="ts">

import {IonButton, IonContent, IonIcon, IonInput, IonItem, IonList, IonPage, IonLabel,} from "@ionic/vue";
import HeaderToolbar from "@/components/HeaderToolbar.vue";
import {lockClosedOutline, personCircleOutline} from "ionicons/icons";
import FormErrorList from "@/components/FormErrorList.vue";
</script>
<script lang="ts">
import axiosInstance from '@/config/axiosConfig';
import FormErrors from '../mixins/FormErrors';
import {defineComponent} from "vue";

export default defineComponent({
  name: 'RegisterPage',
  mixins: [FormErrors],
  data() {
    return {
      username: '',
      password: '',
      password2: '',
      displayName: '',
      loading: false,
    }
  },
  methods: {
    register() {
      this.loading = true;
      const form = {
        username: this.username,
        password: this.password,
        displayName: this.displayName,
      };
      this.resetFormErrors();
      localStorage.clear();
      axiosInstance.post('/api/register', form)
          .then(() => {
            this.loading = false;
            this.$router.push({
              path: '/login',
              query: {afterRegister: true},
            })
          })
          .catch((error) => {
            this.parseFormErrors(error.response.data);
            this.loading = false;
          });
    },
  },
  computed: {
    matchingPassword() {
      return this.password === this.password2;
    },
    isDisabled() {
      return !this.matchingPassword || !this.username || !this.password || !this.displayName
    },
  }
})
</script>

<style scoped>

</style>