import { defineStore } from "pinia";
import axios from "/src/api/axios";
import { ref } from "vue";
import router from "../router";

export const useGenreStore = defineStore("GenreStore", () => {
  const genres = ref([]);
  const pages = ref([]);
  const genre = ref({});
  const errors = ref({});

  async function index(url = "genre") {
    if (url === null) {
      return;
    }

    genres.value = [];
    const response = await axios.get(url);

    pages.value = response.data.meta.links;
    genres.value = response.data.data;
  }

  async function show(id) {
    const response = await axios.get(`genre/${id}`);
    this.genre = response.data.data;
  }

  async function store(name) {
    try {
      errors.value = {};
      await axios.post("genre", { name });
      await router.push({ name: "genres" });
    } catch (e) {
      console.log(e);
      if (axios.isAxiosError(e) && e.response.status === 422) {
        errors.value = e.response.data.errors;
      }
    }
  }

  async function update(data) {
    try {
      errors.value = {};
      if (!data) {
        data = genre.value;
      }
      await axios.put(`genre/${data.id}`, data);
      await router.push({ name: "genres" });
    } catch (e) {
      if (axios.isAxiosError(e) && e.response.status === 422) {
        errors.value = e.response.data.errors;
      }
    }
  }

  async function destroy(id) {
    await axios.delete(`genre/${id}`);
    await this.index();
  }

  return {
    genres,
    pages,
    genre,
    errors,
    index,
    store,
    show,
    update,
    destroy,
  };
});
