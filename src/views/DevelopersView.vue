<script setup>
import AddButton from "../components/AddButton.vue";
import RefreshButton from "../components/RefreshButton.vue";
import RemoveButton from "../components/RemoveButton.vue";
import EditButton from "../components/EditButton.vue";
import { TailwindPagination } from 'laravel-vue-pagination';
import { useDevelopers } from "../composables/developers";
import SearchInput from "../components/SearchInput.vue";

const { data: developersData, index: getDevelopers, destroy: destroyDeveloper, search } = useDevelopers();

getDevelopers();
</script>
<template>
  <section class="flex flex-col gap-y-10 w-full items-center">
    <div class="flex justify-around w-full">
      <router-link to="/developers/add">
        <add-button></add-button>
      </router-link>

      <refresh-button @on-click="getDevelopers()"></refresh-button>
    </div>

    <search-input @on-submit="getDevelopers" v-model="search"></search-input>

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
          <tr v-for="developer in developersData.data.data" class="bg-white border-b">
            <th scope="row" class="py-4 px-6 font-medium text-gray-500 whitespace-nowrap">
              {{ developer.id }}
            </th>
            <td class="py-4 px-6 text-gray-900">{{ developer.name }}</td>
            <td class="py-4 px-6 flex justify-between gap-x-4">
              <router-link :to="{ name: 'developers/edit', params: { id: developer.id } }">
                <edit-button></edit-button>
              </router-link>

              <remove-button @on-click="destroyDeveloper(developer.id)"></remove-button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <tailwind-pagination :limit="50" :data="developersData.data" @pagination-change-page="getDevelopers" />
  </section>
</template>
