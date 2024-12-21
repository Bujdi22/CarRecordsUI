<script lang="ts">
import {defineComponent} from 'vue'
import {IonButton} from "@ionic/vue";
import getBaseUrl from "@/utils/baseUrlProvider";

export default defineComponent({
  name: "GoogleSignInButton",
  components: {IonButton},
  methods: {
    getGoogleURI(): string{
      const redirectURI = getBaseUrl() + '/google-redirect-uri';
      const clientID = '218645435843-ofhsg050adqnt4v5gto1ig4snkg4c6ql.apps.googleusercontent.com';
      return `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${redirectURI}&response_type=code&client_id=${clientID}&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+openid&access_type=offline`;
    },
  }
})
</script>

<template>
  <div class="has-padding is-flex">
    <a :href="getGoogleURI()">
      <ion-button expand="block" color="light">
        <img src="/src/assets/google.webp" style="height: 1.5em; margin-right: 10px"/>
        Sign in with Google
      </ion-button>
    </a>
  </div>
</template>

<style scoped>

</style>