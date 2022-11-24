<script setup>
defineEmits(["onClick"]);
</script>
<template>
  <div>
    <button
      @click="$emit('onClick')"
      class="text-white rounded-3xl bg-red-600 hover:bg-red-500 p-3 text-xs font-bold transition delay-75 ease-in-out hover:bg-accent-turquoise-light"
    >
      <span class="flex gap-2 items-center">
        <img src="/src/assets/remove.png" class="w-4 inline" />
        Remove
      </span>
    </button>
  </div>
</template>
