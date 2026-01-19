<template>
  <ion-page>

    <header-toolbar>About</header-toolbar>
    <ion-content>


      <div class="container">
        <div class="has-text-justified page-style">
          <div class="large-icon">
            <FontAwesomeIcon :icon="faCircleInfo"></FontAwesomeIcon>
          </div>
          <h1>
            About Auto Journal App
          </h1>
          <div>
            <p>
              This app is designed to make managing your vehicle's maintenance simple, organized, and stress-free.
              Whether you're tracking routine services or keeping detailed records for future use, Auto Journal helps you stay on top of everything.
            </p>
            <h3>Back up your data</h3>
            <p>Do not rely on this app as the single source for your data. Keeping backups is always a good idea.</p>
            <h3>Features</h3>
            <ul>
              <li>Add your vehicles to keep all records associated with them in one place.</li>
              <li>Log maintenance records to document services carried out on your vehicles.</li>
              <li>Attach photos, such as receipts or proof of serviced parts, for future reference.</li>
              <li>Easily review service history to know when things were last done.</li>
            </ul>
            <h3>What’s Next?</h3>
            <ul>
              <li>
                Ability to transfer vehicle ownership to another account. <br>
                This feature will make it easy to pass on service history to a new owner when selling your car.
              </li>
              <li>
                Release the app to iOS and Android mobile stores.
              </li>
            </ul>

            <h3>Contact</h3>
            <p>Any questions? Please contact me on
              <a href="mailto:admin@autojournalapp.com">admin@autojournalapp.com</a>
            </p>
            <p class="m-t-50">
              <i>Balázs, Creator</i>
            </p>
          </div>
        </div>
        <p class="copyright-text">AutoJournal {{ getYear() }}</p>
      </div>

    </ion-content>

  </ion-page>


</template>

<script setup lang="ts">

import {IonContent, IonPage} from "@ionic/vue";
import HeaderToolbar from "@/components/HeaderToolbar.vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {faCircleInfo} from "@fortawesome/free-solid-svg-icons";
import {getYear} from "@/utils/dateUtils";

</script>

<style scoped>

</style>