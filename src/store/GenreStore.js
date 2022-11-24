import { defineStore } from "pinia";
import axios from "/src/api/axios";
import { ref } from "vue";

export const useGenreStore = defineStore("GenreStore", () => {
  const genres = ref([]);
  const pages = ref([]);

  async function index(url = "genre") {
    if (url === null) {
      return;
    }

    genres.value = [];
    const response = await axios.get(url);

    console.log(response);

    pages.value = response.data.links;
    genres.value = response.data.data;
  }

  async function store(name) {
    if (name) {
      const response = await axios.post("genre", { name });
      console.log(response);
    }
  }

  return { genres, pages, index, store };
});
