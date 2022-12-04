<script setup>
import SaveButton from "../components/SaveButton.vue";
import CommonInputText from "../components/CommonInputText.vue";
import { ref, computed } from "vue";
import { useGames } from "../composables/games";
import { useGenres } from "../composables/genres";
import { useDevelopers } from "../composables/developers";

const toggleDeveloperChooser = ref(false);
const toggleGenreChooser = ref(false);

const { store: storeGame, parameters: gamesParameters } = useGames();
const { data: genresData, all: getGenres, search: searchGenre } = useGenres();
const { data: developersData, all: getDevelopers, search: searchDeveloper } = useDevelopers();

getGenres();
getDevelopers();

function onClickDeveloperChooser() {
  toggleDeveloperChooser.value = !toggleDeveloperChooser.value;
  if (toggleGenreChooser.value === true) {
    toggleGenreChooser.value = false;
  }
}

function onClickGenreChooser() {
  toggleGenreChooser.value = !toggleGenreChooser.value;

  if (toggleDeveloperChooser.value === true) {
    toggleDeveloperChooser.value = false;
  }
}

function isCheckedGenre(genre) {
  for (const selectedGenre in gamesParameters.value.genres) {
    if (selectedGenre.name === genre.name) {
      return true;
    }
  }
  return false;
}

function removeGenre(genre) {
  const index = gamesParameters.value.genres.findIndex((object) => { return object.id === genre.id });
  gamesParameters.value.genres.splice(index, 1);
}

function onSubmit() {
  storeGame();
}
</script>

<template>
  <div>
    <div class="mb-10">
      <h1 class="text-4xl">Choosed Game Options:</h1>
      <div class="flex flex-col gap-y-2 text-2xl font-medium text-gray-600">
        <p><b>Name: </b>{{ gamesParameters.name }}</p>
        <p><b>Developer: </b>{{ gamesParameters.developer.name }}</p>
        <div>
          <b>Genres: </b>
          <span v-for="genre in gamesParameters.genres" class="ml-2">
            <button @click="removeGenre(genre)"
              class="border-2 border-gray-600 rounded-full p-2 hover:bg-gray-600 hover:text-white">
              {{ genre.name }} &#10006
            </button>
          </span>
        </div>
      </div>
    </div>
    <form @submit.prevent="onSubmit()" class="flex flex-col gap-20 items-center">
      <common-input-text :name="'name'" :label="'Name'" :type="'text'" :autocomplete="'name'"
        v-model="gamesParameters.name"></common-input-text>

      <div class="">
        <button id="dropdownSearchButton" data-dropdown-toggle="dropdownSearch" data-dropdown-placement="bottom"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button" @click="onClickDeveloperChooser">
          Choose Developer
          <svg class="ml-2 w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>

        <!-- Dropdown menu -->
        <div v-if="toggleDeveloperChooser" id="dropdownSearch"
          class="absolute z-50 w-60 bg-white rounded shadow dark:bg-gray-700">
          <div class="p-3">
            <label for="input-group-search" class="sr-only">Search</label>
            <div class="relative">
              <button type="button" @click="getDevelopers" class="flex absolute inset-y-0 left-0 items-center pl-1">
                <svg class="p-1 w-8 h-8 text-white bg-blue-600 hover:bg-blue-700 rounded-3xl" aria-hidden="true"
                  fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clip-rule="evenodd"></path>
                </svg>
              </button>
              <input type="text" id="input-group-search" v-model="searchDeveloper"
                class="block p-2 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search Developer">
            </div>
          </div>
          <ul class="overflow-y-auto px-3 pb-3 h-56 text-sm text-gray-700" aria-labelledby="dropdownSearchButton">
            <li v-for="developer in developersData.data.data">
              <div class="flex items-center pl-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                <input :checked="developer.name === gamesParameters.developer.name" type="radio" :value="developer"
                  v-model="gamesParameters.developer"
                  class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                <label for="checkbox-item-11"
                  class="py-2 ml-2 w-full text-sm font-medium text-gray-900 rounded dark:text-gray-300">{{
                      developer.name
                  }}</label>
              </div>
            </li>
          </ul>
          <button type="button" @click="gamesParameters.value.developer = {}"
            class="p-3 text-sm font-medium text-red-600 w-full text-center bg-gray-50 border-t border-gray-200 dark:border-gray-600 hover:bg-gray-100 hover:underline">
            Clear
          </button>
        </div>
      </div>

      <div class="">
        <button id="dropdownSearchButton" data-dropdown-toggle="dropdownSearch" data-dropdown-placement="bottom"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button" @click="onClickGenreChooser">
          Choose Genres
          <svg class="ml-2 w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>

        <!-- Dropdown menu -->
        <div v-if="toggleGenreChooser" id="dropdownSearch"
          class="absolute z-50 w-60 bg-white rounded shadow dark:bg-gray-700">
          <div class="p-3">
            <label for="input-group-search" class="sr-only">Search</label>
            <div class="relative">
              <button type="button" @click="getGenres" class="flex absolute inset-y-0 left-0 items-center pl-1">
                <svg class="p-1 w-8 h-8 text-white bg-blue-600 hover:bg-blue-700 rounded-3xl" aria-hidden="true"
                  fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clip-rule="evenodd"></path>
                </svg>
              </button>
              <input type="text" id="input-group-search" v-model="searchGenre"
                class="block p-2 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search Genres">
            </div>
          </div>
          <ul class="overflow-y-auto px-3 pb-3 h-56 text-sm text-gray-700" aria-labelledby="dropdownSearchButton">
            <li v-for="genre in genresData.data.data">
              <div class="flex items-center pl-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                <input :checked="isCheckedGenre(genre)" type="checkbox" :value="genre" v-model="gamesParameters.genres"
                  class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                <label for="checkbox-item-11"
                  class="py-2 ml-2 w-full text-sm font-medium text-gray-900 rounded dark:text-gray-300">{{
                      genre.name
                  }}</label>
              </div>
            </li>
          </ul>
          <button type="button" @click="gamesParameters.genres = []"
            class="p-3 text-sm font-medium text-red-600 w-full text-center bg-gray-50 border-t border-gray-200 dark:border-gray-600 hover:bg-gray-100 hover:underline">
            Clear
          </button>
        </div>
      </div>

      <save-button></save-button>
    </form>
  </div>
</template>
