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
            <h3>What You Can Do</h3>
            <ul>
              <li>Add your vehicles to keep all records associated with them in one place.</li>
              <li>Log maintenance records to document services carried out on your vehicles.</li>
              <li>Attach photos, such as receipts or proof of serviced parts, for future reference.</li>
              <li>Easily review service history to know when things were last done.</li>
            </ul>
            <h3>Why It’s Useful</h3>
            <p>
              Keeping a detailed service history isn’t just handy for your own records — it’s also a valuable resource when selling your vehicle.
              Prospective buyers will appreciate a well-documented maintenance history, which can give you an edge in negotiations and provide peace of mind for the buyer.
            </p>
            <h3>What’s Next?</h3>
            <p>
              We're working on adding the ability to <strong>transfer vehicle ownership</strong> to another account.
              This feature will make it even easier to pass on service history to a new owner when selling your car.
            </p>
            <p>We are also going to release the app to iOS and Android <strong>mobile devices</strong> stores in the near future.</p>

            <h3>Contact</h3>
            <p>Any questions? Please contact me on
              <a href="mailto:admin@autojournalapp.com">admin@autojournalapp.com</a>
            </p>
            <p class="m-t-50">
              <i>Balázs Bujdosó, Creator</i>
            </p>
          </div>
        </div>
      </div>

    </ion-content>

  </ion-page>


</template>

<script setup lang="ts">

import {IonContent, IonPage} from "@ionic/vue";
import HeaderToolbar from "@/components/HeaderToolbar.vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {faCircleInfo, faCircleQuestion} from "@fortawesome/free-solid-svg-icons";

</script>

<style scoped>

</style>