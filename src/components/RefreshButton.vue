<script setup>
defineEmits(["onClick"]);
</script>
<template>
  <div>
    <button
      @click="$emit('onClick')"
      class="d:p-6 text-white rounded-full bg-blue-600 hover:bg-blue-500 p-3 text-xl font-bold transition delay-75 ease-in-out hover:bg-accent-turquoise-light sm:p-5"
    >
      <span class="flex gap-2 items-center">
        <img src="/src/assets/refresh.png" class="w-8 inline" />
        <span>Update</span>
      </span>
    </button>
  </div>
</template>
