<script setup>
defineEmits(["onClick"]);
</script>
<template>
  <div>
    <button
      @click="$emit('onClick')"
      class="text-white rounded-full bg-red-600 hover:bg-red-500 p-1 text-xl font-bold transition delay-75 ease-in-out hover:bg-accent-turquoise-light"
    >
      <span class="flex gap-2 items-center">
        <img src="/src/assets/remove.png" class="w-10 inline" />
      </span>
    </button>
  </div>
</template>
