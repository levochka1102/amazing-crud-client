<script setup>
import SaveButton from "../components/SaveButton.vue";
import CommonInputText from "../components/CommonInputText.vue";
import { useDeveloperStore } from "../store/DeveloperStore";
import { onMounted, computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const developerStore = useDeveloperStore();
const id = route.params.id;

const specificErrorsMessage = computed(() => {
  return developerStore.errors.name
    ? developerStore.errors.name.join(", ")
    : "";
});

onMounted(() => developerStore.show(id));
</script>
<template>
  <form
    @submit.prevent="developerStore.update()"
    class="flex flex-col gap-20 items-center"
  >
    <common-input-text
      :name="'name'"
      :label="'Name'"
      :type="'text'"
      :autocomplete="'name'"
      :error="specificErrorsMessage"
      v-model.trim="developerStore.developer.name"
    ></common-input-text>
    <save-button></save-button>
  </form>
</template>
