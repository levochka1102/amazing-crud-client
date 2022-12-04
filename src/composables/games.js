import axios from "/src/api/axios";
import { ref } from "vue";
import router from "../router";

export function useGames() {
    const data = ref([]);
    const parameters = ref({
        limit: 15,
        search: '',
        name: '',
        genres: [],
        developer: {
            name: ''
        },
        developers: [],
    });
    const errors = ref({});
    const game = ref({});
    const search = ref('');
    const url = "games";

    const index = async (page = 1) => {
        const { limit, search, genres, developers } = parameters.value;

        const response = await axios.get(`${url}?${parseModelsToUrl(genres, 'genres')}&${parseModelsToUrl(developers, 'developers')}`, {
            params: {
                page,
                limit,
                search,
            }
        });

        data.value = await response;
    }

    const show = async (id) => {
        const response = await axios.get(`${url}/${id}`);
        game.value = await response.data;
    }

    const store = async () => {
        const { name, genres, developer } = parameters.value;

        try {
            errors.value = {};
            await axios.post(`${url}?${parseModelsToUrl(genres, 'genres')}`,
                { name, developer: developer.id });
            await router.push({ name: "games" });
        } catch (e) {
            if (axios.isAxiosError(e) && e.response.status === 422) {
                errors.value = e.response.data.errors;
            }
        }
    }

    const update = async () => {
        const { name, genres, developer } = parameters.value;

        try {
            errors.value = {};
            await axios.put(`${url}/${game.value.id}?${parseModelsToUrl(genres, 'genres')}`,
                { name, developer: developer.id });
            await router.push({ name: "games" });
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

    const parseModelsToUrl = (model, name) => {
        if (model.length === 0) {
            return name;
        }

        let i = 0;
        let array = [];
        model.forEach(el => array.push(`${name}[${i++}][id]=${el.id}`));

        return array.join('&');
    }

    return {
        data,
        search,
        parameters,
        game,
        errors,
        index,
        store,
        show,
        update,
        destroy,
    };
};
