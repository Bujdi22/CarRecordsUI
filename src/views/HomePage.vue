<template>
  <ion-page>
    <header-toolbar>Home</header-toolbar>
    <ion-content>
      <div class="container">
        <div class="home-section">

          <div class="is-half">
            <h1>Welcome to AutoJournal</h1>
            <p>Effortlessly keep your vehicle maintenance records organized and up-to-date!</p>

            <h2 class="m-t-50">We’re excited to announce that AutoJournal is coming soon to both <ion-icon :icon="logoApple"></ion-icon>iOS and <ion-icon :icon="logoAndroid" style="margin-bottom:-2px;"></ion-icon>Android!</h2>

            <p>Stay tuned to your favorite app store and get ready to manage your vehicle’s maintenance history anytime, anywhere.</p>

            <h4 class="m-t-50" v-if="!account">
              Ready to get started? Visit our <router-link to="/login">login page</router-link> to create your account today!
            </h4>
          </div>
          <div class="is-half has-text-right">
            <img src="/src/assets/new-illustration.png"/>
          </div>



        </div>
        <p class="copyright-text">AutoJournal {{ getDate() }}</p>

      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import HeaderToolbar from "@/components/HeaderToolbar.vue";
import {IonContent, IonIcon, IonPage} from "@ionic/vue";
import {logoAndroid, logoApple} from "ionicons/icons";
</script>
<script lang="ts">

import {defineComponent} from "vue";
import {mapState} from "vuex";
import moment from "moment/moment";

export default defineComponent({
  name: 'HomePage',
  computed: mapState({
    account: state => state.account
  }),
  methods: {
    getDate() {
      return moment().format('YYYY');
    }
  }
})
</script>

<style scoped>
img {
  height: 25vh;
  //-webkit-box-shadow: -7px 8px 24px -4px rgba(231,166,26,1);
  //-moz-box-shadow: -7px 8px 24px -4px rgba(231,166,26,1);
  //box-shadow: -7px 8px 24px -4px rgba(231,166,26,1);
}
ion-icon {
  margin-right: 6px;
}
</style>