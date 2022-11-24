<script setup>
import SaveButton from "../components/SaveButton.vue";
import CommonInputText from "../components/CommonInputText.vue";
import { ref } from "vue";
import { useGenreStore } from "../store/GenreStore";
import router from "../router";

const genreStore = useGenreStore();
const genre = ref("");

function onSubmit() {
  genreStore.store(genre.value);
  router.push({ name: "genres" });
}
</script>
<template>
  <form @submit.prevent="onSubmit()" class="flex flex-col gap-20 items-center">
    <common-input-text
      :name="'genre'"
      :label="'Genre'"
      :type="'text'"
      :autocomplete="'genre'"
      v-model="genre"
    ></common-input-text>
    <save-button></save-button>
  </form>
</template>
