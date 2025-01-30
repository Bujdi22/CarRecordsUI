<template>
  <div class="layout-switch-container">
    <ion-button
        :color="modelValue === 'list' ? 'primary' : 'light'"
        class="layout-switch-1"
        @click="change('list')"
    >
      <ion-icon
          slot="icon-only"
          :icon="reorderFourOutline()"
      ></ion-icon>
    </ion-button>

    <ion-button
        :color="modelValue === 'grid' ? 'primary' : 'light'"
        class="layout-switch-2"
        @click="change('grid')"
    >
      <ion-icon
          slot="icon-only"
          :icon="gridOutline()"
      ></ion-icon>
    </ion-button>
  </div>

</template>
<script lang="ts">
import {defineComponent} from 'vue'
import {gridOutline, reorderFourOutline} from "ionicons/icons";
import {IonIcon} from "@ionic/vue";

export default defineComponent({
  name: "LayoutSwitch",
  components: {IonIcon},
  props: {
    modelValue: {required: true, type: String}
  },
  methods: {
    gridOutline() {
      return gridOutline
    },
    reorderFourOutline() {
      return reorderFourOutline
    },
    change(v: string) {
      this.$emit('update:modelValue', v)
    },
  }
})
</script>
<style scoped lang="scss">
ion-icon {
  font-size: 1.5em;
}
.layout-switch-container {
  display: flex;
  padding: 5px;
  .layout-switch-1 {
    margin-right: 0;
  }
  .layout-switch-2{
    margin-left: 0;
  }
}

</style>