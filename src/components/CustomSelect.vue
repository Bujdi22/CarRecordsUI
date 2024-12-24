<script setup lang="ts">
import VueSelect from "vue3-select-component";

defineProps(['modelValue', 'options', 'isItem'])
defineEmits(['update:modelValue'])
</script>

<template>
  <div :class="{'select-item-wrapper': isItem}">
      <p class="select-title" v-if="$slots.default">
        <slot>
        </slot>
      </p>
    <p v-if="!options.length">
      No options available.
    </p>
    <VueSelect
        v-else
        :modelValue="modelValue"
        @update:modelValue="(v) => $emit('update:modelValue', v)"
        :options="options"
        placeholder="Select an option"
    />
  </div>
</template>