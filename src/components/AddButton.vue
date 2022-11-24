<script setup>
defineEmits(["click"]);
</script>
<template>
  <div>
    <button
      @click="$emit('click')"
      class="d:p-6 text-white rounded-full bg-teal-600 hover:bg-teal-500 p-3 text-xl font-bold transition delay-75 ease-in-out hover:bg-accent-turquoise-light sm:p-5"
    >
      <span class="flex gap-2 items-center">
        <img src="/src/assets/plus.svg" class="w-6 inline" />
        <span>Add New</span>
      </span>
    </button>
  </div>
</template>
