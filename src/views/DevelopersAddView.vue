<script setup>
import SaveButton from "../components/SaveButton.vue";
import CommonInputText from "../components/CommonInputText.vue";
import { useDeveloperStore } from "../store/DeveloperStore";
import { ref, computed } from "vue";

const name = ref("");

const specificErrorsMessage = computed(() => {
  return developerStore.errors.name
    ? developerStore.errors.name.join(", ")
    : "";
});

const developerStore = useDeveloperStore();
</script>
<template>
  <form
    @submit.prevent="developerStore.store(name)"
    class="flex flex-col gap-20 items-center"
  >
    <common-input-text
      :name="'name'"
      :label="'Name'"
      :type="'text'"
      :autocomplete="'name'"
      :error="specificErrorsMessage"
      v-model="name"
    ></common-input-text>
    <save-button></save-button>
  </form>
</template>
