import { createRouter, createWebHistory } from "vue-router";

const HomeView = () => import("/src/views/HomeView.vue");

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/:catchAll(.*)",
    redirect: (to) => {
      return "/";
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
