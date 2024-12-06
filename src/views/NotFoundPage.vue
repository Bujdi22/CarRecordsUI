<template>
  <ion-page>
    <header-toolbar>Not found</header-toolbar>
    <ion-content>
      <div class="container">
        <div class="page-style">
          <div class="large-icon">
            <FontAwesomeIcon :icon="faFile"></FontAwesomeIcon>
          </div>
          <h3 class="m-b-50">
            Sorry, page not found
          </h3>
          <router-link to="/home">
            <ion-button color="primary">Home page</ion-button>
          </router-link>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>
<script setup lang="ts">
import {IonButton, IonContent, IonPage} from "@ionic/vue";
import HeaderToolbar from "@/components/HeaderToolbar.vue";
import {faFile} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
</script>