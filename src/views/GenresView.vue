<script setup>
import AddButton from "../components/AddButton.vue";
import RefreshButton from "../components/RefreshButton.vue";
import RemoveButton from "../components/RemoveButton.vue";
import { useGenreStore } from "../store/GenreStore";

const genreStore = useGenreStore();
</script>
<template>
  <section class="flex flex-col gap-y-10 w-full items-center">
    <div class="flex justify-around w-full">
      <router-link to="/genres/add">
        <add-button></add-button>
      </router-link>

      <refresh-button @on-click="genreStore.index()"></refresh-button>
    </div>

    <div>
      <ul class="grid grid-cols-4 gap-6 h-96">
        <li
          v-for="genre in genreStore.genres"
          :key="genre.id"
          class="rounded-3xl bg-teal-50 text-2xl flex items-center gap-x-8 justify-between p-2 drop-shadow-xl hover:bg-teal-100"
        >
          <p class="font-bold">{{ genre.id }}</p>
          <p>{{ genre.name }}</p>
          <remove-button></remove-button>
        </li>
      </ul>
    </div>

    <div>
      <ul class="flex flex-wrap gap-6">
        <li v-for="page in genreStore.pages">
          <button
            @click="genreStore.index(page.url)"
            :class="{ 'pointer-events-none bg-teal-500': page.active }"
            class="text-2xl p-6 bg-teal-600 hover:bg-teal-500 rounded-full active:rotate-12 transition-all text-white"
          >
            {{ page.label }}
          </button>
        </li>
      </ul>
    </div>
  </section>
</template>
