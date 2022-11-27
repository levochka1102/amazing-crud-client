<script setup>
import AddButton from "../components/AddButton.vue";
import RefreshButton from "../components/RefreshButton.vue";
import RemoveButton from "../components/RemoveButton.vue";
import EditButton from "../components/EditButton.vue";
import { TailwindPagination } from 'laravel-vue-pagination';
import { useGenres } from "../composables/genres";
import SearchInput from "../components/SearchInput.vue";

const { data: genresData, index: getGenres, destroy: destroyGenre, search } = useGenres();

getGenres();
</script>
<template>
  <section class="flex flex-col gap-y-10 w-full items-center">
    <div class="flex justify-around w-full">
      <router-link to="/genres/add">
        <add-button></add-button>
      </router-link>

      <refresh-button @on-click="getGenres()"></refresh-button>
    </div>

    <search-input @on-submit="getGenres" v-model="search"></search-input>

    <div class="overflow-x-auto relative shadow-md sm:rounded-lg h-[492px]">
      <table class="w-full text-xl text-left text-gray-900">
        <thead class="text-xl text-gray-900 uppercase bg-gray-50">
          <tr>
            <th scope="col" class="py-3 px-6">id</th>
            <th scope="col" class="py-3 px-6">Name</th>
            <th scope="col" class="py-3 px-6">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="genre in genresData.data.data" class="bg-white border-b">
            <th scope="row" class="py-4 px-6 font-medium text-gray-500 whitespace-nowrap">
              {{ genre.id }}
            </th>
            <td class="py-4 px-6 text-gray-900">{{ genre.name }}</td>
            <td class="py-4 px-6 flex justify-between gap-x-4">
              <router-link :to="{ name: 'genres/edit', params: { id: genre.id } }">
                <edit-button></edit-button>
              </router-link>

              <remove-button @on-click="destroyGenre(genre.id)"></remove-button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <tailwind-pagination :limit="50" :data="genresData.data" @pagination-change-page="getGenres" />
  </section>
</template>
