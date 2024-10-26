<template>
  <ion-page>

    <header-toolbar>Forgot password</header-toolbar>
    <ion-content>

      <div class="container">
        <ion-card>
          <ion-card-header>
            <ion-card-title>You are now going to reset your password.</ion-card-title>
            <ion-card-subtitle>Please type your new password.</ion-card-subtitle>
          </ion-card-header>
        </ion-card>
        <form-error-list :errors="formErrors"></form-error-list>

        <ion-list>
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
            <ion-button expand="block" @click="reset" :disabled="isDisabled">
              Reset Password
            </ion-button>
          </div>


        </ion-list>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {lockClosedOutline} from "ionicons/icons";
import FormErrorList from "@/components/FormErrorList.vue";
</script>
<script lang="ts">
import {defineComponent} from 'vue'
import HeaderToolbar from "@/components/HeaderToolbar.vue";
import axiosInstance from '@/config/axiosConfig';
import FormErrors from '../mixins/FormErrors';
import {
  IonPage,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonList,
  IonLabel,
  IonInput,
  IonButton, IonItem, IonIcon
} from "@ionic/vue";

export default defineComponent({
  name: "ForgotPasswordPage",
  components: {
    IonIcon,
    IonItem,
    IonButton,
    IonInput,
    IonLabel,
    IonList, HeaderToolbar, IonPage, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle},
    mixins: [FormErrors],

  data() {
    return {
      password: '',
      password2: '',
    };
  },

  computed: {
    matchingPassword() {
      return this.password === this.password2;
    },
    isDisabled() {
      return !this.matchingPassword || !this.password;
    },
  },

  methods: {
    reset() {
      this.resetFormErrors();
      this.$store.commit('setAccount', null);
      localStorage.clear();

      const form = {
        password: this.password,
        token: this.$route.query.token
      }

      axiosInstance.post('/api/forgot-password', form)
          .then(() => {
            this.$router.push({
              path: '/login',
              query: {afterForgot: true},
            })
          })
          .catch((error) => {
            this.parseFormErrors(error.response.data);
          });
    }
  }
})
</script>

<style scoped>

</style>