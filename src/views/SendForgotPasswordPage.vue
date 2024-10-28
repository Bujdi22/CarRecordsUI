<template>
  <ion-page>

    <header-toolbar>Forgot password</header-toolbar>
    <ion-content>

      <div class="container">
        <ion-card>
          <ion-card-header>
            <ion-card-title>Request a password reset</ion-card-title>
            <ion-card-subtitle>
              If you have forgotten your password, please enter your e-mail address below,
              and we will send a password reset link if we find a matching account.
            </ion-card-subtitle>
          </ion-card-header>
        </ion-card>
        <form-error-list :errors="formErrors"></form-error-list>

        <ion-list>
            <ion-item>
              <ion-input v-model="username" label="Email" label-placement="stacked" placeholder="Type your email">
                <ion-icon slot="end" :icon="personCircleOutline" size="medium" aria-hidden="true"></ion-icon>
              </ion-input>
            </ion-item>


          <div style="padding:10px;">
            <ion-button expand="block" @click="send" :disabled="!username">
              Send
            </ion-button>
          </div>


        </ion-list>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
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
  IonInput,
  IonButton, IonItem, IonIcon,
    IonContent,
} from "@ionic/vue";
import Swal from "sweetalert2";
import {personCircleOutline} from "ionicons/icons";

export default defineComponent({
  name: "SendForgotPasswordPage",
  components: {
    IonIcon,
    IonItem,
    IonButton,
    IonInput,
    IonList, HeaderToolbar, IonPage, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonContent},
  mixins: [FormErrors],

  data() {
    return {
      username: '',
    };
  },

  methods: {
    send() {
      this.resetFormErrors();
      this.$store.commit('setAccount', null);
      localStorage.clear();

      const form = {
        username: this.username,
      }

      axiosInstance.post('/api/forgot-password-request', form)
          .then(() => {
            Swal.fire({
              title: "Check your e-mail",
              text: "If we found your account, you will get a password reset e-mail shortly.",
              icon: "success",
              confirmButtonText: 'Ok',
              heightAuto: false
            }).then(() => {
              this.$router.push('/');
            });
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