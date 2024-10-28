<template>
  <ion-page>

    <header-toolbar>Login</header-toolbar>
    <ion-content>

      <div class="container">
        <ion-card v-if="afterRegister || afterForgot" color="success">
          <ion-card-header>
            <ion-card-title v-if="afterRegister">Register successful</ion-card-title>
            <ion-card-title v-else>Password reset successful</ion-card-title>
            <ion-card-subtitle>Please use your new credentials to login below.</ion-card-subtitle>
          </ion-card-header>
        </ion-card>

        <form-error-list :errors="formErrors"></form-error-list>

        <ion-list>
          <ion-item>
            <ion-input v-model="username" label="Email" label-placement="stacked" placeholder="Type your email">
              <ion-icon slot="end" :icon="personCircleOutline" size="medium" aria-hidden="true"></ion-icon>
            </ion-input>
          </ion-item>
          <ion-item>
            <ion-input v-model="password" label="Password" label-placement="stacked" type="password"
                       placeholder="Type your password">
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

          <div style="padding:10px;">-
            <ion-button expand="block" @click="redirectToForgotPassword" color="medium">
              Forgot Password?
            </ion-button>
          </div>


        </ion-list>

      </div>

    </ion-content>

  </ion-page>


</template>

<script setup lang="ts">

import {
  IonContent,
  IonIcon,
  IonPage,
  IonInput,
  IonItem,
  IonButton,
  IonList,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle
} from "@ionic/vue";

import {
  lockClosedOutline,
  personCircleOutline
} from 'ionicons/icons';
import HeaderToolbar from "@/components/HeaderToolbar.vue";
import FormErrorList from "@/components/FormErrorList.vue";
</script>
<script lang="ts">
import axiosInstance from '@/config/axiosConfig';
import {defineComponent} from "vue";

export default defineComponent({
  name: 'LoginPage',
  data() {
    return {
      username: '',
      password: '',
      formErrors: null,
    }
  },
  methods: {
    login() {
      this.$router.replace('/login');
      this.formErrors = null;
      localStorage.clear();
      axiosInstance.post('/api/login', {username: this.username, password: this.password}).then((data) => {
        localStorage.setItem('bearerToken', data.data);
        axiosInstance.get('/api/fetch-account').then((data) => {
          this.$store.commit('setAccount', data.data)
          localStorage.setItem('account', JSON.stringify(data.data));
          this.$router.push('/home');
        })
      }).catch(error => {
        if (error.response && error.response.status === 403) {
          this.formErrors = {
            'Credentials': 'Incorrect credentials'
          };
        } else {
          this.formErrors = {
            'Error': 'Something went wrong'
          };
        }
      });
    },
    redirectToRegister() {
      this.$router.push('/register');
    },
    redirectToForgotPassword() {
      this.$router.push('/forgot-password');
    }
  },
  computed: {
    afterRegister() {
      return !!this.$route.query.afterRegister;
    },
    afterForgot() {
      return !!this.$route.query.afterForgot;
    }
  }
})
</script>

<style scoped>

</style>