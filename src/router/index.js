import { createRouter, createWebHistory } from "vue-router";
import { useGenreStore } from "/src/store/GenreStore";
import { useDeveloperStore } from "/src/store/DeveloperStore";

const GenresView = () => import("/src/views/GenresView.vue");
const GenresAddView = () => import("/src/views/GenresAddView.vue");
const GenresEditView = () => import("/src/views/GenresEditView.vue");

const DevelopersView = () => import("/src/views/DevelopersView.vue");
const DevelopersAddView = () => import("/src/views/DevelopersAddView.vue");
const DevelopersEditView = () => import("/src/views/DevelopersEditView.vue");

const GamesView = () => import("/src/views/GamesView.vue");

const routes = [
  {
    path: "/genres",
    name: "genres",
    component: GenresView,
    beforeEnter: (to, from) => {
      const genreStore = useGenreStore();
      genreStore.index();
    },
  },
  {
    path: "/genres/add",
    name: "genres/add",
    component: GenresAddView,
  },
  {
    path: "/genres/edit/:id",
    name: "genres/edit",
    component: GenresEditView,
  },
  {
    path: "/developers",
    name: "developers",
    component: DevelopersView,
    beforeEnter: (to, from) => {
      const developerStore = useDeveloperStore();
      developerStore.index();
    },
  },
  {
    path: "/developers/add",
    name: "developers/add",
    component: DevelopersAddView,
  },
  {
    path: "/developers/edit/:id",
    name: "developers/edit",
    component: DevelopersEditView,
  },
  {
    path: "/games",
    name: "games",
    component: GamesView,
  },
  // {
  //   path: "/:catchAll(.*)",
  //   redirect: (to) => {
  //     return "/developers";
  //   },
  // },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
