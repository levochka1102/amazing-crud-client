<script setup>
import SaveButton from "../components/SaveButton.vue";
import CommonInputText from "../components/CommonInputText.vue";
import { reactive, computed } from "vue";
import { useGenres } from "../composables/genres";

const { store, errors } = useGenres();

const options = reactive({
  name: '',
});

const nameMessage = computed(() => {
  return errors.value.name ? errors.value.name.join(", ") : "";
});
</script>
<template>
  <form @submit.prevent="store(options)" class="flex flex-col gap-20 items-center">
    <common-input-text :name="'genre'" :label="'Genre'" :type="'text'" :autocomplete="'genre'" :error="nameMessage"
      v-model="options.name"></common-input-text>
    <save-button></save-button>
  </form>
</template>
