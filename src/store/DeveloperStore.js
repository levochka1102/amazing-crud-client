import { defineStore } from "pinia";
import axios from "/src/api/axios";
import { ref } from "vue";
import router from "../router";

export const useDeveloperStore = defineStore("DeveloperStore", () => {
  const developers = ref([]);
  const pages = ref([]);
  const developer = ref({});
  const errors = ref({});

  async function index(url = "developer") {
    if (url === null) {
      return;
    }

    developers.value = [];
    const response = await axios.get(url);

    pages.value = response.data.meta.links;
    developers.value = response.data.data;
  }

  async function show(id) {
    const response = await axios.get(`developer/${id}`);
    developer.value = response.data.data;
  }

  async function store(name) {
    try {
      errors.value = {};
      await axios.post("developer", { name });
      await router.push({ name: "developers" });
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
        data = developer.value;
      }
      await axios.put(`developer/${data.id}`, data);
      await router.push({ name: "developers" });
    } catch (e) {
      if (axios.isAxiosError(e) && e.response.status === 422) {
        errors.value = e.response.data.errors;
      }
    }
  }

  async function destroy(id) {
    await axios.delete(`developer/${id}`);
    await this.index();
  }

  return {
    developers: developers,
    pages,
    developer,
    errors,
    index,
    store,
    show,
    update,
    destroy,
  };
});
