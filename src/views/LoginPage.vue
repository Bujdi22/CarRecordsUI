<template>
  <ion-page>

    <header-toolbar>Login</header-toolbar>
    <ion-content>

      <div class="container">
        <ion-card v-if="afterRegister" color="success">
          <ion-card-header>
            <ion-card-title>Register successful</ion-card-title>
            <ion-card-subtitle>Please use your new credentials to login below.</ion-card-subtitle>
          </ion-card-header>
        </ion-card>

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

          <div style="padding:10px;">
            <ion-button expand="block" @click="redirectToRegister" color="medium">
              New here? Create an account
            </ion-button>
          </div>



        </ion-list>

      </div>

    </ion-content>

  </ion-page>


</template>

<script setup lang="ts">

import {IonContent, IonIcon, IonPage, IonInput, IonItem, IonButton, IonList, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle} from "@ionic/vue";

import {
  lockClosedOutline,
  personCircleOutline
} from 'ionicons/icons';
import HeaderToolbar from "@/components/HeaderToolbar.vue";
</script>
<script lang="ts">
import axiosInstance from '@/config/axiosConfig';

export default {
  data() {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    login() {
      localStorage.clear();
      axiosInstance.post('/api/login', {username: this.username, password: this.password}).then((data) => {
        localStorage.setItem('bearerToken', data.data); // Save token to local storage
        axiosInstance.get('/api/fetch-account').then((data) => {
          this.$store.commit('setAccount', data.data)
          localStorage.setItem('account', JSON.stringify(data.data));
          this.$router.push('/home');
        })
        setTimeout(() => {
          axiosInstance.get('/api/refresh-token').then((response) => {
            console.log(response)
          })
        }, 3000)

      }).catch(error => {
        if (error.response && error.response.status === 401) {
          // Handle unauthorized response without prompting for credentials
          console.error('Invalid username or password');
        } else {
          console.error('An error occurred:', error);
        }
      });
    },
    redirectToRegister() {
      this.$router.push('/register');
    }
  },
  computed: {
    afterRegister() {
      return !!this.$route.query.afterRegister;
    }
  }
}
</script>

<style scoped>

</style>