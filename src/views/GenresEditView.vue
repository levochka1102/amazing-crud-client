<script setup>
import SaveButton from "../components/SaveButton.vue";
import CommonInputText from "../components/CommonInputText.vue";
import { useGenreStore } from "../store/GenreStore";
import { onMounted, computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const genreStore = useGenreStore();
const id = route.params.id;

const specificErrorsMessage = computed(() => {
  return genreStore.errors.name ? genreStore.errors.name.join(", ") : "";
});

onMounted(() => genreStore.show(id));
</script>
<template>
  <form
    @submit.prevent="genreStore.update()"
    class="flex flex-col gap-20 items-center"
  >
    <common-input-text
      :name="'genre'"
      :label="'Genre'"
      :type="'text'"
      :autocomplete="'genre'"
      :error="specificErrorsMessage"
      v-model="genreStore.genre.name"
    ></common-input-text>
    <save-button></save-button>
  </form>
</template>
