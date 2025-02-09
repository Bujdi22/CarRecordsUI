<template>
  <ion-page>

    <header-toolbar>Forgot password</header-toolbar>
    <ion-content>
      <div class="is-login-container has-background">
        <router-link to="/login" class="back-link">
          <ion-icon :icon="arrowBackOutline"></ion-icon>
          <span>
            Go Back
          </span>
        </router-link>

        <img src="../assets/logo.webp"
             class="is-our-logo"
             alt="logo"/>
        <h1>Forgot Password</h1>
        <p class="m-b-50">Enter your e-mail to reset your password</p>

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
import {arrowBackOutline} from "ionicons/icons";
</script>
<script lang="ts">
import {defineComponent} from 'vue'
import HeaderToolbar from "@/components/HeaderToolbar.vue";
import FormErrors from '../mixins/FormErrors';
import {
  IonPage,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonList,
  IonInput,
  IonButton, IonItem, IonIcon,
    IonContent, IonCardContent
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
    IonList, HeaderToolbar, IonPage, IonCard, IonCardHeader, IonCardTitle, IonContent, IonCardContent},
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

      this.$axios.post('/api/forgot-password-request', form)
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