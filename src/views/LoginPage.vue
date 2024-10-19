<template>
  <ion-page>
    <header-toolbar>Login</header-toolbar>

    <ion-content :fullscreen="true">

      <div class="container">
        {{password}} {{ username}}
        <ion-list>
          <ion-item>
            <ion-input v-model="username" label="Email" label-placement="stacked" placeholder="Type your email">
              <ion-icon slot="end" :icon="personCircleOutline" size="medium" aria-hidden="true"></ion-icon>
            </ion-input>
          </ion-item>
          <ion-item>
            <ion-input v-model="password" label="Password" label-placement="stacked" type="password" placeholder="Type your password">
              <ion-icon slot="end" :icon="lockClosedOutline" size="medium" aria-hidden="true"></ion-icon>
            </ion-input>
          </ion-item>

          <div style="padding:10px;">
            <ion-button expand="block" @click="login">
              Login
            </ion-button>
          </div>

        </ion-list>

      </div>

    </ion-content>

  </ion-page>


</template>

<script setup lang="ts">

import axios from 'axios';

import {IonContent, IonIcon, IonPage, IonInput} from "@ionic/vue";
import {
  lockClosedOutline,
  personCircleOutline
} from 'ionicons/icons';
import HeaderToolbar from "@/components/HeaderToolbar.vue";
import {ref} from "vue";

const username = ref('');
const password = ref('');

function login() {
  axios.post('/api/login', {username: username.value, password: password.value}).then((data) => {
    console.log(data);
  }).catch(error => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized response without prompting for credentials
      console.error('Invalid username or password');
    } else {
      console.error('An error occurred:', error);
    }
  });
}
</script>

<style scoped>

</style>