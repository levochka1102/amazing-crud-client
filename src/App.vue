<script setup>
import { RouterLink, RouterView } from "vue-router";
import NavigationHeader from "/src/components/NavigationHeader.vue";
import PopUp from "./components/PopUp.vue";

</script>

<template>
  <pop-up></pop-up>

  <main class="min-h-screen min-w-min space-y-10 bg-slate-100 p-1 md:p-8">
    <navigation-header></navigation-header>

    <section class="tail flex justify-center rounded-3xl bg-white p-6 drop-shadow-xl">
      <router-view></router-view>
    </section>
  </main>
</template>
