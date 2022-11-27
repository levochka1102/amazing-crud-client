import axios from "/src/api/axios";
import { ref } from "vue";
import router from "../router";

export function useGames() {
    const data = ref({});
    const errors = ref({});
    const game = ref({});
    const url = "game";
    const search = ref('');
    const selectedGenres = ref([]);
    const selectedDevelopers = ref([]);
    const perPageLimit = 15;

    const index = async (page = 1, limit = perPageLimit) => {
        const response = await axios.get(`${url}`, {
            params: {
                limit, search: search.value, page, genres_ids: joinGamesIds(), developers_ids: joinGamesIds(selectedDevelopers.value)
            }
        });
        data.value = await response;
    }

    const show = async (id) => {
        const response = await axios.get(`${url}/${id}`);
        game.value = await response.data.data;
    }

    const store = async (options) => {
        try {
            errors.value = {};
            await axios.post(url, options);
            await router.push({ name: "games" });
        } catch (e) {
            if (axios.isAxiosError(e) && e.response.status === 422) {
                errors.value = e.response.data.errors;
            }
        }
    }

    const update = async (options) => {
        try {
            errors.value = {};
            const response = await axios.put(`${url}/${game.value.id}`, options);
            await router.push({ name: "games" });
            console.log(response);
        } catch (e) {
            console.log(e);
            if (axios.isAxiosError(e) && e.response.status === 422) {
                errors.value = e.response.data.errors;
            }
        }
    }

    const destroy = async (id) => {
        await axios.delete(`${url}/${id}`);
        await index();
    }

    const joinGamesIds = (array = selectedGenres.value) => {
        return array.reduce(function (a, b) {
            return a + ["", ", "][+!!a.length] + b.id;
        }, "")
    }

    return {
        search,
        data,
        game,
        errors,
        index,
        store,
        show,
        update,
        destroy,
        selectedGenres,
        joinGamesIds,
        selectedDevelopers,
    };
};
