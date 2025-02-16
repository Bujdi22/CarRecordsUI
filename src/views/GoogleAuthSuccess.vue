<template>
  <ion-page>
    <ion-progress-bar type="indeterminate"></ion-progress-bar>
    <header-toolbar>Retrieving account...</header-toolbar>
    <ion-content>


      <div class="container">
        <br>
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

export default defineComponent({
  data() {
    return {
      loggingIn: false,
    }
  },
  mounted() {
    onIonViewDidEnter(() => {
      if (!this.loggingIn) {
        this.login();
      }
    });
    this.login();
  },
  methods: {
    login() {
      this.loggingIn = true;
      localStorage.clear();
      localStorage.setItem('bearerToken', this.token);
      axiosInstance.get('/api/refresh-token').then((response) => {
        localStorage.setItem('bearerToken', response.data);
        axiosInstance.get('/api/fetch-account').then((data) => {
          this.$store.commit('setAccount', data.data)
          localStorage.setItem('account', JSON.stringify(data.data));
          this.loggingIn = false;
          this.$router.push('/home');
        })
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