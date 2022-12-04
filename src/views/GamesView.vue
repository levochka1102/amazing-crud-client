<script setup>
import AddButton from "../components/AddButton.vue";
import RefreshButton from "../components/RefreshButton.vue";
import RemoveButton from "../components/RemoveButton.vue";
import EditButton from "../components/EditButton.vue";
import { TailwindPagination } from 'laravel-vue-pagination';
import { ref } from "vue";
import { useGenres } from "../composables/genres";
import { useGames } from "../composables/games";
import { useDevelopers } from "../composables/developers";
import SearchInput from "../components/SearchInput.vue";

const toggleGenreDropdown = ref(false);
const toggleDeveloperDropdown = ref(false);

const { data: gamesData, parameters: gamesParameters, index: getGames, destroy: destroyGame } = useGames()
const { data: genresData, all: getGenres, search: searchGenres } = useGenres()
const { data: developersData, all: getDevelopers, search: searchDeveloper } = useDevelopers();

function onClickDropdownMenuButton() {
  toggleGenreDropdown.value = !toggleGenreDropdown.value;
}

function onAcceptDropdownGenres() {
  getGames();
}

function onClearDropdownGenres() {
  gamesParameters.value.genres = [];
  getGames();
}

function onAcceptDropdownDevelopers() {
  getGames();
}

function onClearDropdownDevelopers() {
  gamesParameters.value.developers = [];
  getGames();
}

function onUpdate() {
  gamesParameters.value.genres = [];
  getGames();
}

getGames();
getGenres();
getDevelopers();
</script>

<template>
  <section class="flex flex-col gap-y-10 w-full items-center">
    <div class="flex justify-around w-full">
      <router-link to="/games/add">
        <add-button></add-button>
      </router-link>

      <refresh-button @on-click="onUpdate()"></refresh-button>
    </div>

    <search-input @on-submit="getGames" v-model="gamesParameters.search"></search-input>

    <div class="overflow-x-auto relative shadow-md sm:rounded-lg h-[492px]">
      <table class="w-full text-xl text-left text-gray-900">
        <thead class="text-xl text-gray-900 uppercase bg-gray-50">
          <tr>
            <th scope="col" class="py-3 px-6">id</th>
            <th scope="col" class="py-3 px-6">Name</th>
            <th scope="col" class="py-3 px-6">Developer</th>
            <th scope="col" class="py-3 px-6">Genres</th>
            <th scope="col" class="py-3 px-6">Action</th>
          </tr>

          <tr>
            <th scope="col" class="py-3 px-6"></th>
            <th scope="col" class="py-3 px-6"></th>
            <th scope="col" class="py-3 px-6">
              <div class="">
                <button id="dropdownSearchButton" data-dropdown-toggle="dropdownSearch" data-dropdown-placement="bottom"
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  type="button" @click="toggleDeveloperDropdown = !toggleDeveloperDropdown">
                  Choose Developer
                  <svg class="ml-2 w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>

                <!-- Dropdown menu -->
                <div v-if="toggleDeveloperDropdown" id="dropdownSearch"
                  class="absolute z-50 w-60 bg-white rounded shadow dark:bg-gray-700">
                  <div class="p-3">
                    <label for="input-group-search" class="sr-only">Search</label>
                    <div class="relative">
                      <button type="button" @click="getDevelopers"
                        class="flex absolute inset-y-0 left-0 items-center pl-1">
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
                  <ul class="overflow-y-auto px-3 pb-3 h-56 text-sm text-gray-700"
                    aria-labelledby="dropdownSearchButton">
                    <li v-for="developer in developersData.data.data">
                      <div class="flex items-center pl-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                        <input type="checkbox" :value="developer" v-model="gamesParameters.developers"
                          class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                        <label for="checkbox-item-11"
                          class="py-2 ml-2 w-full text-sm font-medium text-gray-900 rounded dark:text-gray-300">{{
                              developer.name
                          }}</label>
                      </div>
                    </li>
                  </ul>
                  <button @click="onAcceptDropdownDevelopers()"
                    class="p-3 text-sm font-medium text-green-600 w-full text-center bg-gray-50 border-t border-gray-200 dark:border-gray-600 hover:bg-gray-100 hover:underline">
                    Accept
                  </button>
                  <button type="button" @click="onClearDropdownDevelopers()"
                    class="p-3 text-sm font-medium text-red-600 w-full text-center bg-gray-50 border-t border-gray-200 dark:border-gray-600 hover:bg-gray-100 hover:underline">
                    Clear
                  </button>
                </div>
              </div>
            </th>
            <th scope="col" class="py-3 px-6">
              <button id="dropdownSearchButton" data-dropdown-toggle="dropdownSearch" data-dropdown-placement="bottom"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button" @click="onClickDropdownMenuButton()">
                Choose genres
                <svg class="ml-2 w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>

              <!-- Dropdown menu -->
              <div v-if="toggleGenreDropdown" id="dropdownSearch"
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
                    <input type="text" id="input-group-search" v-model="searchGenres"
                      class="block p-2 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Search Genres">
                  </div>
                </div>
                <ul class="overflow-y-auto px-3 pb-3 h-56 text-sm text-gray-700" aria-labelledby="dropdownSearchButton">
                  <li v-for="genre in genresData.data.data">
                    <div class="flex items-center pl-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                      <input :id="genre.id" type="checkbox" :value="genre" v-model="gamesParameters.genres"
                        class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                      <label for="checkbox-item-11"
                        class="py-2 ml-2 w-full text-sm font-medium text-gray-900 rounded dark:text-gray-300">{{
                            genre.name
                        }}</label>
                    </div>
                  </li>
                </ul>
                <button @click="onAcceptDropdownGenres()"
                  class="p-3 text-sm font-medium text-green-600 w-full text-center bg-gray-50 border-t border-gray-200 dark:border-gray-600 hover:bg-gray-100 hover:underline">
                  Accept
                </button>
                <button @click="onClearDropdownGenres()"
                  class="p-3 text-sm font-medium text-red-600 w-full text-center bg-gray-50 border-t border-gray-200 dark:border-gray-600 hover:bg-gray-100 hover:underline">
                  Clear
                </button>
              </div>
            </th>
            <th scope="col" class="py-3 px-6"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="game in gamesData.data.data" class="bg-white border-b">
            <th scope="row" class="py-4 px-6 font-medium text-gray-500 whitespace-nowrap">
              {{ game.id }}
            </th>
            <td class="py-4 px-6 text-gray-900">{{ game.name }}</td>
            <td class="py-4 px-6 text-gray-900">{{ game.developer?.name }}</td>
            <td class="py-4 px-6 text-gray-900">
              {{
                  game.genres.data.reduce(function (a, b) {
                    return a + ["", ", "][+!!a.length] + b.name;
                  }, "")
              }}
            </td>
            <td class="py-4 px-6 flex justify-between gap-x-4">
              <router-link :to="{ name: 'games/edit', params: { id: game.id } }">
                <edit-button></edit-button>
              </router-link>

              <remove-button @on-click="destroyGame(game.id)"></remove-button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <tailwind-pagination :limit="50" :data="gamesData.data" @pagination-change-page="getGames" />
  </section>
</template>
