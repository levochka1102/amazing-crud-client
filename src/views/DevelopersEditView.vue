<script setup>
import SaveButton from "../components/SaveButton.vue";
import CommonInputText from "../components/CommonInputText.vue";
import { onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { useDevelopers } from "../composables/developers"

const route = useRoute();
const { developer, show, update } = useDevelopers();

const id = route.params.id;

onMounted(() => show(id));
</script>
<template>
  <form @submit.prevent="update()" class="flex flex-col gap-20 items-center">
    <common-input-text :name="'developer'" :label="'Developer'" :type="'text'" :autocomplete="'developer'"
      v-model.trim="developer.name"></common-input-text>
    <save-button></save-button>
  </form>
</template>
