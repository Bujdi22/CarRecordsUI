<template>
  <ion-app>
    <ion-split-pane content-id="main-content">
      <ion-menu content-id="main-content" type="overlay">
        <ion-content>
          <ion-list id="inbox-list" style="padding-top: 60px">
            <div>
              <img v-if="isDarkMode()"
                  src="./assets/logo_white.png"
                  style="display: block; width: 80%; margin: auto; height: auto;"
                  alt="logo"/>
              <img v-else
                  src="./assets/logo_black.png"
                  style="display: block; width: 80%; margin: auto; height: auto;"
                  alt="logo"/>
            </div>

            <div style="text-align: center">
              <ion-note>Your maintenance records application</ion-note>
            </div>

            <ion-menu-toggle :auto-hide="false"
                             v-for="(p, i) in appPages"
                             :key="i">
              <ion-item @click="selectedIndex = i"
                        router-direction="root"
                        :router-link="p.url"
                        lines="none"
                        :detail="false"
                        class="hydrated"
                        :class="{ selected: selectedIndex === i }"
                        :disabled="p.accountRequired && !account"
              >
                <ion-icon aria-hidden="true" slot="start" :ios="p.iosIcon" :md="p.mdIcon"></ion-icon>
                <ion-label>{{ p.title }}</ion-label>
              </ion-item>
            </ion-menu-toggle>
          </ion-list>
        </ion-content>
      </ion-menu>

      <ion-router-outlet id="main-content"></ion-router-outlet>
    </ion-split-pane>
  </ion-app>
</template>

<script setup lang="ts">
import {
  IonApp,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonRouterOutlet,
  IonSplitPane,
  IonNote,
} from '@ionic/vue';
</script>
<script lang="ts">
import {
  carOutline,
  carSharp,
  homeOutline,
  homeSharp,
  informationCircleOutline,
  informationCircleSharp
} from "ionicons/icons";
import {mapState} from "vuex";

export default {
  data() {
    return {
      selectedIndex: 0,
      appPages: [
        {
          title: 'Home',
          url: '/home',
          iosIcon: homeOutline,
          mdIcon: homeSharp,
        },
        {
          title: 'About',
          url: '/about',
          iosIcon: informationCircleOutline,
          mdIcon: informationCircleSharp,
        },
        {
          title: 'My Vehicles',
          url: '/vehicles',
          iosIcon: carOutline,
          mdIcon: carSharp,
          accountRequired: true,
        },
      ],
      refreshInterval: null,
    }
  },
  mounted() {
    const path = window.location.pathname.split('/')[1];
    if (path) {
      this.selectedIndex = this.appPages.findIndex((page) => page.title.toLowerCase() === path.toLowerCase());
    }
  },

  computed: mapState({
    account: state => state.account
  }),

  watch: {
    account(account) {
      console.log('account changed', account);
    }
  },
  methods: {
    isDarkMode() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
  },
}
</script>

<style scoped>
</style>
