<template>
  <ion-page>

    <header-toolbar>Account Management</header-toolbar>
    <ion-content>

      <div class="container">
        <h2>Welcome, {{ account?.username }}</h2>
        <ion-button color="danger" @click="logout">Logout</ion-button>
        <br>
        <ion-button color="danger" @click="deleteAccount">Delete Account</ion-button>
      </div>

    </ion-content>

  </ion-page>


</template>

<script lang="ts">
import {IonContent, IonPage, IonButton} from "@ionic/vue";
import HeaderToolbar from "@/components/HeaderToolbar.vue";
import {mapState} from "vuex";
import {defineComponent} from "vue";
import Confirm from "@/utils/confirm";

export default defineComponent({
  name: "AccountPage",
  components: {
    IonContent, IonPage, IonButton, HeaderToolbar,
  },
  methods: {
    logout() {
      Confirm.fire({
        title: "Would you like to logout?",
        text: "Press confirm if you would like to logout.",
      }).then((result) => {
        if (result.isConfirmed) {
          this.logoutAction();
        }
      });
    },
    logoutAction() {
      localStorage.clear();
      this.$store.commit('setAccount', null);
      this.$router.push('/');
    },
    deleteAccount() {
      Confirm.fire({
        title: "Would you like to delete your account?",
        text: "This cannot be undone."
      }).then((result) => {
        if (result.isConfirmed) {
          this.$axios.delete('/api/delete-account').then(() => {
            this.logoutAction();
          })
        }
      });
    }
  },

  computed: mapState({
    account: state => state.account
  })
})
</script>
<style scoped>

</style>