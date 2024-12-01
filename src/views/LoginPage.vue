<template>
  <ion-page>
    <ion-progress-bar v-if="loading" type="indeterminate"></ion-progress-bar>

    <header-toolbar>Sign in</header-toolbar>
    <ion-content>

      <div class="container">
        <ion-card v-if="afterForgot" color="success">
          <ion-card-header>
            <ion-card-title>Password reset successful</ion-card-title>
            <ion-card-subtitle>Please use your new credentials to login below.</ion-card-subtitle>
          </ion-card-header>
        </ion-card>
        <ion-card v-else-if="afterRegister" color="success">
          <ion-card-header>
            <ion-card-title>We sent you an e-mail.</ion-card-title>
            <ion-card-subtitle>Please check your e-mail and click the verification link.</ion-card-subtitle>
            <ion-card-subtitle>After that, you can use your credentials to sign in to your new account.</ion-card-subtitle>
            <ion-card-subtitle>Welcome to the team!</ion-card-subtitle>
          </ion-card-header>
        </ion-card>
        <ion-card v-else-if="afterVerification" color="success">
          <ion-card-header>
            <ion-card-title>You verified your e-mail.</ion-card-title>
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
                       placeholder="Type your password" @keyup.enter="login">
              <ion-icon slot="end" :icon="lockClosedOutline" size="medium" aria-hidden="true"></ion-icon>
            </ion-input>
          </ion-item>

        </ion-list>

        <div class="has-background has-padding">

          <div class="has-padding is-flex">
            <ion-button expand="block" @click="login">
              Sign In
            </ion-button>
          </div>
          <google-sign-in-button></google-sign-in-button>
          <div class="has-padding is-flex">

            <div class="m-r-10">
              <ion-button expand="block" @click="redirectToRegister" color="light">
                New here? Create an account
              </ion-button>
            </div>

            <div>
              <ion-button expand="block" @click="redirectToForgotPassword" color="light">
                Forgot Password?
              </ion-button>
            </div>
          </div>
        </div>
      </div>

    </ion-content>

  </ion-page>


</template>

<script lang="ts">
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
  IonCardSubtitle,
  onIonViewDidEnter,
  IonProgressBar,
} from "@ionic/vue";

import {
  lockClosedOutline,
  personCircleOutline
} from 'ionicons/icons';
import HeaderToolbar from "@/components/HeaderToolbar.vue";
import FormErrorList from "@/components/FormErrorList.vue";
import {defineComponent} from "vue";
import axiosInstance from "@/config/axiosConfig";
import GoogleSignInButton from "@/components/GoogleSignInButton.vue";

export default defineComponent({
  name: 'LoginPage',
  components: {
    GoogleSignInButton,
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
    IonCardSubtitle,
    HeaderToolbar,
    FormErrorList,
    IonProgressBar,
  },
  data() {
    return {
      username: '',
      password: '',
      formErrors: null,
      loading: false,
    }
  },
  created() {
    onIonViewDidEnter(() => {
      this.username = '';
      this.password =  '';
      this.formErrors = null;
    });
  },
  methods: {
    baseUrl() {
      return baseUrl
    },
    axiosInstance,
    login() {
      this.loading = true;
      const redirect = this.$route.query.redirect ? this.$route.query.redirect : '/home';
      this.$router.replace('/login');
      this.formErrors = null;
      localStorage.clear();
      axiosInstance.post('/api/login', {username: this.username, password: this.password}).then((data) => {
        localStorage.setItem('bearerToken', data.data);
        this.$axios.get('/api/fetch-account').then((data) => {
          this.$store.commit('setAccount', data.data)
          localStorage.setItem('account', JSON.stringify(data.data));
          this.loading = false;
          this.$router.push(redirect);
        })
      }).catch(error => {
        this.loading = false;
        if (error.response.data && error.response.status === 403) {
          this.formErrors = {
            'Account': error.response.data
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
    },
    lockClosedOutline() { return lockClosedOutline },
    personCircleOutline() { return personCircleOutline },
  },
  computed: {
    afterRegister() {
      return !!this.$route.query.afterRegister;
    },
    afterForgot() {
      return !!this.$route.query.afterForgot;
    },
    afterVerification() {
      return !!this.$route.query.afterVerification;
    }
  }
})
</script>

<style scoped>

</style>