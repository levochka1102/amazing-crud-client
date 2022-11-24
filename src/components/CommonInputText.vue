<script setup lang="ts">
defineProps<{
  name: string;
  label: string;
  type: string;
  autocomplete: string;
  modelValue: string;
}>();

defineEmits<{
  (
    e: "update:modelValue",
    value: HTMLInputElement["value"]
  ): HTMLInputElement["value"];
}>();
</script>

<template>
  <div class="relative">
    <input
      required
      :type="type"
      :name="name"
      :autocomplete="autocomplete"
      :placeholder="label"
      :value="modelValue"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
      class="peer mt-3 block w-full border-b-2 border-gray-300 px-2 text-3xl py-4 placeholder-transparent focus:border-accent-turquoise-common focus:outline-none"
    />
    <label
      :for="name"
      class="pointer-events-none absolute left-2 -top-3 block text-2xl font-medium text-gray-600 transition-all peer-placeholder-shown:top-7 peer-placeholder-shown:left-2 peer-placeholder-shown:text-2xl peer-placeholder-shown:text-gray-400 peer-focus:-top-3 peer-focus:text-2xl peer-focus:text-gray-600"
      >{{ label }}</label
    >
  </div>
</template>
