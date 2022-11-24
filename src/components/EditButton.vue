<script setup>
defineEmits(["onClick"]);
</script>
<template>
  <div>
    <button
      @click="$emit('onClick')"
      class="text-white rounded-3xl bg-yellow-600 hover:bg-yellow-500 p-3 text-xs font-bold transition delay-75 ease-in-out hover:bg-accent-turquoise-light"
    >
      <span class="flex gap-2 items-center">
        <img src="/src/assets/edit.png" class="w-4 inline" />
        Edit
      </span>
    </button>
  </div>
</template>
