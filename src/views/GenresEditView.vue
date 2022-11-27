<script setup>
import SaveButton from "../components/SaveButton.vue";
import CommonInputText from "../components/CommonInputText.vue";
import { onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { useGenres } from "../composables/genres"

const route = useRoute();
const { genre, show, update, errors } = useGenres();

const id = route.params.id;

const nameErrorMessage = computed(() => {
  return errors.value.name ? errors.value.name.join(", ") : "";
});

onMounted(() => show(id));
</script>
<template>
  <form @submit.prevent="update()" class="flex flex-col gap-20 items-center">
    <common-input-text :name="'genre'" :label="'Genre'" :type="'text'" :autocomplete="'genre'" :error="nameErrorMessage"
      v-model.trim="genre.name"></common-input-text>
    <save-button></save-button>
  </form>
</template>
