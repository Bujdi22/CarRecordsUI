<template>
  <ion-page>

    <header-toolbar>Register</header-toolbar>
    <ion-content>

      <div class="container">
        <ion-list>
          <ion-item>
            <ion-input v-model="username" label="Email" label-placement="stacked" placeholder="Type your email">
              <ion-icon slot="end" :icon="personCircleOutline" size="medium" aria-hidden="true"></ion-icon>
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
            <ion-input v-model="password2" label="Repeat Password" label-placement="stacked" type="password" placeholder="Type your password again">
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
</script>
<script lang="ts">
import axiosInstance from '@/config/axiosConfig';
export default {
  data() {
    return {
      username: '',
      password: '',
      password2: '',
    }
  },
  methods: {
    register() {
      const form = {
        username: this.username,
        password: this.password,
      };
      axiosInstance.post('/api/register', form)
          .then(() => {
            this.$router.push({
              path: '/login',
              query: {afterRegister: true},
            })
          })
          .catch((error) => {
            console.log(error);
          });
    },
  },
  computed: {
    matchingPassword() {
      return this.password === this.password2;
    },
    isDisabled() {
      return !this.matchingPassword || !this.username || !this.password
    },
  }
}
</script>

<style scoped>

</style>