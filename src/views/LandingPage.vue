<template>
  <ion-page>
    <header-toolbar>
      <template #start>
        <img src="../assets/logo.webp"
             class="small-logo"
             alt="logo"/>
      </template>
    </header-toolbar>
    <div class="landing" ref="landing">
      <div class="text">
        <h1>Welcome.</h1>
        <p>AutoJournal is the place for your vehicles.</p>
      </div>
      <div class="page-2">
        <h1>👋 This is AutoJournal</h1>
        <p>Effortlessly keep your vehicle maintenance records organized and up-to-date!</p>

        <p>Stay tuned to your favorite app store and get ready to manage your vehicle’s maintenance history anytime,
          anywhere.</p>

        <h4 class="m-t-50" v-if="!account">
          Ready to get started? Create your account today!
        </h4>

        <router-link to="/home">
          <ion-button>
            <ion-icon slot="start" :icon="enterOutline()"></ion-icon>
            <span slot="end">
            Sign In
          </span>
          </ion-button>
        </router-link>

        <div class="m-t-50">
          <h3>Features</h3>
          <ul>
            <li>Add your vehicles to keep all records associated with them in one place.</li>
            <li>Log maintenance records to document services carried out on your vehicles.</li>
            <li>Attach photos, such as receipts or proof of serviced parts, for future reference.</li>
            <li>Easily review service history to know when things were last done.</li>
          </ul>
        </div>
      </div>
    </div>
  </ion-page>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {IonIcon, IonPage} from "@ionic/vue";
import {enterOutline} from "ionicons/icons";
import HeaderToolbar from "@/components/HeaderToolbar.vue";

export default defineComponent({
  mounted() {
    setTimeout(() => {
      const container = this.$refs.landing;
      if (container) {
        container.scrollBy({top: 30, behavior: "smooth"});
      }
    }, 150);
  },
  methods: {
    enterOutline() {
      return enterOutline
    },
  },
  components: {HeaderToolbar, IonIcon, IonPage}
})
</script>

<style scoped lang="scss">
.small-logo {
  height: 2em;
  margin-left: 1em;
}

.landing {
  background-image: url('../assets/erik-mclean-ZRns2R5azu0-unsplash-1080.webp');
  height: calc(100vh - 4em);
  overflow-y: auto;
  background-size: cover;
  background-attachment: fixed;
  background-position: center;
  position: relative;

  .text {
    width: fit-content;
    margin-top: 60vh;
    margin-left: auto;
    padding: 20px 50px;
    background: rgb(0, 0, 0, 0.5);

    h1 {
      font-size: 100px;
      background: #FCB53A;
      background: linear-gradient(to right, #a66400 -20%, #ffff00 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    p {
      font-size: 20px;
      color: white;
    }
  }

  .page-2 {
    padding: 20px;
    margin-top: 60px;
    background: rgb(0, 0, 0, 0.75);
    color: white;
    padding-bottom: 150px;
  }
}

@media only screen and (max-width: 767px) {
  .landing {
    .text {
      h1 {
        font-size: 60px;
      }
    }
  }
}
</style>