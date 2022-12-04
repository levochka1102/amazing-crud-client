import axios from "/src/api/axios";
import { ref } from "vue";
import router from "../router";
import { useErrorStore } from "../store/ErrorStore"

export function useGenres() {
    const data = ref({});
    const errorStore = useErrorStore();
    const genre = ref({});
    const search = ref('');
    const perPageLimit = 6
    const url = "genres";

    const all = async () => {
        const response = await axios.get(`${url}/all`, { params: { search: search.value } });
        data.value = await response;
    }

    const index = async (page = 1, limit = perPageLimit) => {
        const response = await axios.get(`${url}`, { params: { limit, search: search.value, page } });
        data.value = await response;
    }

    const show = async (id) => {
        const response = await axios.get(`${url}/${id}`);
        genre.value = await response.data.data;
    }

    const store = async (options) => {
        try {
            await axios.post(url, options);
            await router.push({ name: "genres" });
        } catch (e) {
            if (axios.isAxiosError(e) && e.response.status === 422) {
                errorStore.errors = e.response.data;
            }
        }
    }

    const update = async () => {
        try {
            await axios.put(`${url}/${genre.value.id}`, genre.value);
            await router.push({ name: "genres" });
        } catch (e) {
            if (axios.isAxiosError(e) && e.response.status === 422) {
                errorStore.errors = e.response.data;
            }
        }
    }

    const destroy = async (id) => {
        try {
            await axios.delete(`${url}/${id}`);
            await index();
        } catch (e) {
            if (axios.isAxiosError(e) && e.response.status === 422) {
                errorStore.errors = e.response.data;
            }
        }
    }

    return {
        all,
        data,
        genre,
        index,
        store,
        show,
        update,
        destroy,
        search,
    };
};
