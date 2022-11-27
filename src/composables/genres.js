import axios from "/src/api/axios";
import { ref } from "vue";
import router from "../router";

export function useGenres() {
    const data = ref({});
    const errors = ref({});
    const genre = ref({});
    const search = ref('');
    const perPageLimit = 6
    const url = "genre";

    const all = async () => {
        const response = await axios.get(`${url}/all`, { params: { search: search.value } });
        console.log(response);
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
            errors.value = {};
            await axios.post(url, options);
            await router.push({ name: "genres" });
        } catch (e) {
            if (axios.isAxiosError(e) && e.response.status === 422) {
                errors.value = e.response.data.errors;
            }
        }
    }

    const update = async () => {
        try {
            errors.value = {};
            await axios.put(`${url}/${genre.value.id}`, genre.value);
            await router.push({ name: "genres" });
        } catch (e) {
            if (axios.isAxiosError(e) && e.response.status === 422) {
                errors.value = e.response.data.errors;
            }
        }
    }

    const destroy = async (id) => {
        await axios.delete(`${url}/${id}`);
        await index();
    }

    return {
        all,
        data,
        genre,
        errors,
        index,
        store,
        show,
        update,
        destroy,
        search,
    };
};
