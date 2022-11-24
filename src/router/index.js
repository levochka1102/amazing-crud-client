import { createRouter, createWebHistory } from "vue-router";

const DevelopersView = () => import("/src/views/DevelopersView.vue");
const GamesView = () => import("/src/views/GamesView.vue");
const GenresView = () => import("/src/views/GenresView.vue");
const GenresAddView = () => import("/src/views/GenresAddView.vue");

const routes = [
  {
    path: "/developers",
    name: "developers",
    component: DevelopersView,
  },
  {
    path: "/games",
    name: "games",
    component: GamesView,
  },
  {
    path: "/genres",
    name: "genres",
    component: GenresView,
  },
  {
    path: "/genres/add",
    name: "genres/add",
    component: GenresAddView,
  },
  {
    path: "/:catchAll(.*)",
    redirect: (to) => {
      return "/developers";
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
