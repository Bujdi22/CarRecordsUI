<template>
  <ion-page>
    <ion-progress-bar type="indeterminate"></ion-progress-bar>
    <header-toolbar>Verifying e-mail...</header-toolbar>
    <ion-content>


      <div class="container">
        <p v-if="error">
          Sorry, something went wrong while verifying your e-mail. Please contact us.
        </p>
        <p v-else>
          This will only take a few seconds...
        </p>

      </div>

    </ion-content>

  </ion-page>


</template>

<script setup lang="ts">

import {IonContent, IonPage, IonProgressBar} from "@ionic/vue";
import HeaderToolbar from "@/components/HeaderToolbar.vue";

</script>

<script lang="ts">

import {defineComponent} from "vue";
import {onIonViewDidEnter} from "@ionic/vue";
import axiosInstance from "@/config/axiosConfig";
import Toast from "@/utils/toast";

export default defineComponent({
  data() {
    return {
      verifying: false,
      error: false,
    }
  },
  mounted() {
    onIonViewDidEnter(() => {
      if (!this.verifying) {
        this.verify();
      }
    });
    this.verify();
  },
  methods: {
    verify() {
      this.verifying = true;
      this.error = false;
      localStorage.clear();
      axiosInstance.post('/api/verify-email', {token: this.token})
          .then(() => {
            Toast.fire({'icon': 'success', title: 'Your e-mail was verified'});
            this.$router.push('/login?afterVerification=true');
          })
          .catch(() => {
            this.error = true;
          })
          .finally(() => {
            this.verifying = false;
          })

    }
  },
  computed: {
    token(): string {
      return this.$route.query.token;
    }
  }
})
</script>

<style scoped>

</style>