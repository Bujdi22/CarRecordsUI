<template>
<div>
  <a v-if="!open" @click="load">
    <FontAwesomeIcon :icon="faClockRotateLeft()" class="m-r-5"></FontAwesomeIcon>
    View Changes
  </a>
  <a v-if="open" @click="open = false">
    <FontAwesomeIcon :icon="faCircleXmark()" class="m-r-5"></FontAwesomeIcon>
    Hide Changes
  </a>
  <div v-if="open">
    <ion-spinner v-if="!hasLoaded" style="margin: auto"></ion-spinner>
    <div v-else>
     <div v-for="(item, key) in items" :key="key" class="audit-item">
       <FontAwesomeIcon :icon="faWrench()" class="m-r-5"></FontAwesomeIcon>
       {{ formatCreatedAt(item.event_happened_on) }} — {{ getFieldName(item.updated_field)}} Field
       <p>
         Before:
         <span v-if="item.updated_field !== 'descriptionJson'">
           {{ item.old_value }}
         </span>
         <ul v-else style="margin-bottom: 0">
           <li v-for="(value, key) in JSON.parse(item.old_value).items" :key="key">
             {{ value }}
           </li>
         </ul>
       </p><p>
         After:
        <span v-if="item.updated_field !== 'descriptionJson'">
         {{ item.new_value }}
        </span>
         <ul v-else style="margin-bottom: 0">
           <li v-for="(value, key) in JSON.parse(item.new_value).items" :key="key">
             {{ value }}
           </li>
         </ul>
       </p>
     </div>
     <div v-if="!items.length" class="has-padding">
       <p>There were no changes made to this object's details.</p>
     </div>
    </div>
  </div>

</div>
</template>

<script lang="ts">

import {defineComponent} from "vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {faCircleXmark, faClockRotateLeft, faWrench} from "@fortawesome/free-solid-svg-icons";
import {IonSpinner} from "@ionic/vue";
import axiosInstance from "@/config/axiosConfig";
import Toast from "@/utils/toast";
import {AuditEvent} from "@/interfaces/AuditEvent";
import {formatCreatedAt} from "@/utils/dateUtils";
import {humanize} from "@/utils/stringUtils";
export default defineComponent({
  name: "AuditsViewer",
  props: {
    modelType: {required: true, type: String},
    modelId: {required: true, type: String},
    reloader: {required: false, type: Number},
  },
  data() {
    return {
      open: false,
      hasLoaded: false,
      items: [] as AuditEvent[],
    }
  },
  watch: {
    reloader() {
      this.init();
    }
  },
  methods: {
    formatCreatedAt,
    faWrench() {
      return faWrench
    },
    faCircleXmark() {
      return faCircleXmark
    },
    faClockRotateLeft() {
      return faClockRotateLeft
    },
    init() {
      this.open = false;
      this.hasLoaded = false;
      this.items = [];
    },
    load() {
      this.open = true;

      if (this.hasLoaded) {
        return;
      }

      axiosInstance.get(`/api/audit?modelType=${this.modelType}&modelId=${this.modelId}`)
          .then(({data}) => {
            this.items = data.items;
            this.hasLoaded = true;
          })
          .catch((error) => {
            console.error(error);
            Toast.fire({icon: 'error', title: 'Failed to load history.'});
            this.open = false;
          })
    },
    getFieldName(name) {
      if (name === 'descriptionJson') {
        return 'Serviced Items';
      } else {
        return humanize(name);
      }
    },
  },
  components: {IonSpinner, FontAwesomeIcon},

})
</script>

<style scoped>
.audit-item {
  padding: 10px;
}
.audit-item p {
  margin-top: 5px;
}
</style>
