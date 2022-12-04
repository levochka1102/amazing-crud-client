<script setup>
import SaveButton from "../components/SaveButton.vue";
import CommonInputText from "../components/CommonInputText.vue";
import { reactive } from "vue";
import { useGenres } from "../composables/genres";

const { store } = useGenres();

const options = reactive({
  name: '',
});
</script>

<template>
  <form @submit.prevent="store(options)" class="flex flex-col gap-20 items-center">
    <common-input-text :name="'genre'" :label="'Genre'" :type="'text'" :autocomplete="'genre'"
      v-model="options.name"></common-input-text>
    <save-button></save-button>
  </form>
</template>
