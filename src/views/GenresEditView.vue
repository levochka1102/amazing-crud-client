<script setup>
import SaveButton from "../components/SaveButton.vue";
import CommonInputText from "../components/CommonInputText.vue";
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useGenres } from "../composables/genres"

const route = useRoute();
const { genre, show, update } = useGenres();

const id = route.params.id;

onMounted(() => show(id));
</script>

<template>
  <form @submit.prevent="update()" class="flex flex-col gap-20 items-center">
    <common-input-text :name="'genre'" :label="'Genre'" :type="'text'" :autocomplete="'genre'"
      v-model.trim="genre.name"></common-input-text>
    <save-button></save-button>
  </form>
</template>
