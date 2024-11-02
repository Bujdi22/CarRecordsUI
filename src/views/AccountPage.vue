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
import Swal from "sweetalert2";
import {mapState} from "vuex";
import axiosInstance from '@/config/axiosConfig';
import {defineComponent} from "vue";

export default defineComponent({
  name: "AccountPage",
  components: {
    IonContent, IonPage, IonButton, HeaderToolbar,
  },
  methods: {
    logout() {
      Swal.fire({
        title: "Would you like to logout?",
        text: "Press confirm if you would like to logout.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: 'Confirm',
        heightAuto: false
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
      Swal.fire({
        title: "Would you like to delete your account?",
        text: "This cannot be undone.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: 'Yes, delete my account',
        confirmButtonColor: 'red',
        heightAuto: false
      }).then((result) => {
        if (result.isConfirmed) {
          axiosInstance.delete('/api/delete-account').then(() => {
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