import axios from "/src/api/axios";
import { ref } from "vue";
import router from "../router";
import { useErrorStore } from "../store/ErrorStore"

export function useDevelopers() {
    const data = ref({});
    const errorStore = useErrorStore();
    const developer = ref({});
    const search = ref('');
    const perPageLimit = 6
    const url = "developers";

    const all = async () => {
        const response = await axios.get(`${url}/all`, { params: { search: search.value } });
        data.value = await response;
    }

    const index = async (page = 1, limit = perPageLimit) => {
        const response = await axios.get(`${url}`, { params: { limit, search: search.value, page } });
        console.log(response);
        data.value = await response;
    }

    const show = async (id) => {
        const response = await axios.get(`${url}/${id}`);
        developer.value = await response.data.data;
    }

    const store = async (options) => {
        try {
            const response = await axios.post(url, options);
            console.log(response);
            await router.push({ name: "developers" });
        } catch (e) {
            if (axios.isAxiosError(e) && e.response.status === 422) {
                errorStore.errors = e.response.data;
            }
        }
    }

    const update = async () => {
        try {
            await axios.put(`${url}/${developer.value.id}`, developer.value);
            await router.push({ name: "developers" });
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
        developer,
        index,
        store,
        show,
        update,
        destroy,
        search,
    };
};
