<template>
<div>
  <h1>Maintenance Records</h1>
</div>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue'
import {Vehicle} from "@/interfaces/Vehicle";
export default defineComponent({
  name: "MaintenanceRecords",
  props: {
    vehicle: {type: Object as PropType<Vehicle>, required: true},
  },
})
</script>

<style scoped>

</style>