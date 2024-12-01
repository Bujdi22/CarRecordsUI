<template>
  <ion-page>
    <ion-progress-bar v-if="submitLoading" type="indeterminate"></ion-progress-bar>
    <header-toolbar>Account Management</header-toolbar>
    <ion-content>

      <div class="container">
        <div class="has-background has-padding">
          <h2>👋 Welcome, {{ account?.displayName }} </h2>
          <p class="has-padding" style="margin-bottom: 20px">Your e-mail: {{ account?.username }}</p>

          <div v-if="isEdit && form">
            <form-error-list :errors="formErrors"></form-error-list>
            <ion-list>
              <ion-item>
                <ion-input v-model="form.displayName"
                           label="Display Name"
                           label-placement="stacked"
                           placeholder="Type your display name">
                </ion-input>
              </ion-item>
              <ion-item>
                <ion-input
                    v-model="form.password"
                    label="Change Password (Optional)"
                    label-placement="stacked"
                    type="password"
                    placeholder="Type your new password"

                >
                  <ion-icon slot="end" :icon="lockClosedOutline()" size="medium" aria-hidden="true"></ion-icon>
                </ion-input>
              </ion-item>
              <div v-if="form.password">
                <ion-item>
                  <ion-input v-model="form.password2" label="Repeat New Password" label-placement="stacked" type="password"
                             placeholder="Type your new password again">
                    <ion-icon slot="end" :icon="lockClosedOutline()" size="medium" aria-hidden="true"></ion-icon>
                  </ion-input>
                </ion-item>
                <ion-label v-if="!matchingPassword" color="danger" class="validation">Passwords do not match</ion-label>
                <ion-item>
                  <ion-input v-model="form.currentPassword" label="Current Password" label-placement="stacked" type="password"
                             placeholder="Verify with your current password">
                    <ion-icon slot="end" :icon="lockClosedOutline()" size="medium" aria-hidden="true"></ion-icon>
                  </ion-input>
                </ion-item>
                <p class="has-padding">Note: You are changing your password now</p>
              </div>
            </ion-list>

            <div class="is-flex m-t-50">
              <ion-button color="primary" class="m-r-10" @click="submitForm" :disabled="!submittable">Submit</ion-button>
              <ion-button color="light" class="m-r-10" @click="cancelEdit">Cancel</ion-button>
            </div>
          </div>

          <div v-else class="is-flex m-t-50">
            <ion-button color="light" class="m-r-10" @click="showEditForm">Edit Profile</ion-button>
            <ion-button color="light" class="m-r-10" @click="logout">Logout</ion-button>
            <ion-button color="danger" @click="deleteAccount">Delete Account</ion-button>
          </div>
        </div>

      </div>

    </ion-content>

  </ion-page>


</template>

<script lang="ts">
import {
  IonContent,
  IonPage,
  IonButton,
  onIonViewDidEnter,
  IonList,
  IonItem,
  IonIcon,
  IonInput,
  IonLabel, IonProgressBar
} from "@ionic/vue";
import HeaderToolbar from "@/components/HeaderToolbar.vue";
import {mapState} from "vuex";
import {defineComponent} from "vue";
import Confirm from "@/utils/confirm";
import {lockClosedOutline} from "ionicons/icons";
import axiosInstance from "@/config/axiosConfig";
import FormErrors from "@/mixins/FormErrors";
import FormErrorList from "@/components/FormErrorList.vue";
import store from "@/store";
import Toast from "@/utils/toast";

interface Form {
  displayName: string | null;
  currentPassword: string | null;
  password: string | null;
  password2: string | null;
}
export default defineComponent({
  mixins: [FormErrors],
  name: "AccountPage",
  components: {
    FormErrorList,
    IonProgressBar,
    IonLabel, IonInput, IonIcon, IonItem,
    IonList,
    IonContent, IonPage, IonButton, HeaderToolbar,
  },
  data() {
    return {
      form: null as Form | null,
      isEdit: false,
      submitLoading: false,
    }
  },
  mounted() {
    onIonViewDidEnter(() => this.cancelEdit)
  },
  methods: {
    lockClosedOutline() {
      return lockClosedOutline
    },
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
          axiosInstance.delete('/api/delete-account').then(() => {
            this.logoutAction();
          })
        }
      });
    },
    showEditForm() {
      this.form = {
        displayName: this.account.displayName,
        currentPassword: null,
        password: null,
        password2: null,
      };
      this.isEdit = true;
    },
    submitForm() {
      if (!this.submittable) {
        return;
      }
      this.resetFormErrors();
      this.submitLoading = true;

      axiosInstance.post('/api/update-account', this.form)
          .then(({data}) => {
            store.commit('setAccount', data)
            localStorage.setItem('account', JSON.stringify(data));
            Toast.fire({'icon': 'success', title: 'Your profile was updated'});
            this.cancelEdit();
          })
          .catch((error) => {
            this.parseFormErrors(error.response.data);
          })
          .finally(() => {
            this.submitLoading = false;
          })
    },
    cancelEdit() {
      this.resetFormErrors();
      this.form = null;
      this.isEdit = false;
      this.submitLoading = false;
    },
  },

  computed: {
    matchingPassword() {
      return this.form && this.form.password === this.form.password2;
    },
    submittable(): boolean {
      return this.form
          && (!this.form.password || (this.matchingPassword && this.form.currentPassword))
          && this.form.displayName
          && !this.submitLoading;
    },
    ...mapState({
      account: state => state.account
    }),
  }
})
</script>
<style scoped>

</style>