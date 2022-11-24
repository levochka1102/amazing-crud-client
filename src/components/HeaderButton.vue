<script setup>
import { RouterLink } from "vue-router";

defineEmits(["click"]);
</script>
<template>
  <div>
    <button
      @click="$emit('click')"
      class="hover:text-teal-600 transition delay-75 ease-in-out"
    >
      <slot></slot>
    </button>
  </div>
</template>
